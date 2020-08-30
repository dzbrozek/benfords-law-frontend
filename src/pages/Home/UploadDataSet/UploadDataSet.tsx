import { yupResolver } from '@hookform/resolvers';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { reverse } from 'named-urls';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CSVReader } from 'react-papaparse';
import { useHistory } from 'react-router';
import { mutate } from 'swr';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import { useSnackbar } from 'notistack';

import { fileToBase64 } from 'utils/files';
import routes from 'core/routes';
import { DataSetResponse } from 'api/types';
import API from 'api';
import { formErrors } from 'utils/api';

import { UploadDataSetFormValues } from './types';

enum UploadStep {
  SelectFile,
  SelectColumn,
}

export const schema = yup.object().shape({
  name: yup.string().max(200).required('Please provide name'),
  columnName: yup.string().required('Please select column name'),
});

const UploadDataSet = (): React.ReactElement => {
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useHistory();
  const [uploadStep, setUploadStep] = React.useState(UploadStep.SelectFile);
  const [columns, setColumns] = React.useState<
    { value: string; label: string }[]
  >([]);
  const { handleSubmit, register, errors, setError, setValue } = useForm<
    UploadDataSetFormValues
  >({
    resolver: yupResolver(schema),
  });
  const [isUploading, setIsUploading] = React.useState(false);
  const [stateError, setStateError] = React.useState<string | undefined>(
    undefined,
  );

  React.useEffect(() => {
    register({
      name: 'file',
    });
  }, [register]);

  const handleDrop = async (
    parsedData: unknown,
    file?: File,
  ): Promise<void> => {
    if (Array.isArray(parsedData) && parsedData.length && file) {
      setUploadStep(UploadStep.SelectColumn);
      setColumns(
        parsedData[0].data.map((column: string) => ({
          value: column,
          label: column,
        })),
      );
      const base64File = await fileToBase64(file);
      if (base64File) {
        setValue('file', base64File as string);
      }
    } else {
      enqueueSnackbar('You cannot upload empty file', {
        variant: 'error',
      });
    }
  };

  const handleDropError = (): void => {
    enqueueSnackbar('Unable to upload file', {
      variant: 'error',
    });
  };

  const onSubmit = async (formData: UploadDataSetFormValues): Promise<void> => {
    try {
      setIsUploading(true);
      const { data: dataSetData } = await API.uploadDataSet(formData);
      await mutate(
        '/data-sets/',
        (cacheData: DataSetResponse[] | undefined) => {
          return [dataSetData, ...(cacheData || [])];
        },
        false,
      );
      push(reverse(routes.details, { datasetId: dataSetData.id }));
    } catch (e) {
      const [nonFieldError, fieldErrors] = formErrors<
        keyof UploadDataSetFormValues
      >(e);
      fieldErrors?.forEach(({ name, error }) => {
        setError(name, error);
      });
      setStateError(nonFieldError);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {uploadStep === UploadStep.SelectFile ? (
        <CSVReader
          onDrop={handleDrop}
          onError={handleDropError}
          config={{
            preview: 1,
          }}>
          <span>Click to upload a new data set</span>
        </CSVReader>
      ) : null}

      {uploadStep === UploadStep.SelectColumn ? (
        <>
          <p>Name your data set and select column with values to compare.</p>

          {stateError ? (
            <Box marginY={2}>
              <FormHelperText error>{stateError}</FormHelperText>
            </Box>
          ) : null}

          <Box marginTop={2}>
            <TextField
              autoFocus
              id="name"
              name="name"
              label="Name"
              fullWidth
              placeholder="Name your data set"
              inputRef={register}
              error={!!errors.name?.message}
              helperText={errors.name?.message}
            />
          </Box>

          <Box marginTop={2}>
            <TextField
              id="columnName"
              name="columnName"
              label="Column Name"
              fullWidth
              select
              inputRef={register}
              error={!!errors.columnName?.message}
              helperText={errors.columnName?.message}
              disabled={!columns.length}
              onChange={(e) => setValue('columnName', e.target.value)}>
              {columns.map((column) => (
                <MenuItem key={column.value} value={column.value}>
                  {column.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box marginTop={2} display="flex" justifyContent="flex-end">
            <Box marginRight={2}>
              <Button
                color="secondary"
                variant="outlined"
                type="submit"
                onClick={() => setUploadStep(UploadStep.SelectFile)}>
                Cancel
              </Button>
            </Box>

            <Button
              color="primary"
              variant="outlined"
              type="submit"
              disabled={isUploading}>
              Upload
            </Button>
          </Box>
        </>
      ) : null}
    </form>
  );
};

export default UploadDataSet;
