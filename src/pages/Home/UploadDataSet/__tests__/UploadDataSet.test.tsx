import userEvent from '@testing-library/user-event';
import { AxiosPromise } from 'axios';
import { createMemoryHistory } from 'history';
import { reverse } from 'named-urls';
import React from 'react';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';

import routes from 'core/routes';
import { DataSetResponse } from 'api/types';
import API from 'api';
import { DataSetResponseFactory } from 'tests/factories';
import { renderWithProvider } from 'tests/render';

import UploadDataSet, { schema } from '../UploadDataSet';

jest.mock('api');

const mockedAPI = API as jest.Mocked<typeof API>;

describe('<UploadDataSet />', () => {
  it('should render component', async () => {
    renderWithProvider(<UploadDataSet />, {
      withSnackbar: true,
      withRouter: true,
    });

    expect(
      await screen.findByText('Click to upload a new data set'),
    ).toBeTruthy();
  });

  describe('schema', () => {
    it('it should accept valid data', () => {
      expect(
        schema.isValidSync({
          name: 'Test data set',
          columnName: 'price',
        }),
      ).toBeTruthy();
    });

    it('should reject missing data', () => {
      try {
        expect(
          schema.validateSync(
            {
              name: '',
              columnName: '',
            },
            {
              abortEarly: false,
            },
          ),
        );
      } catch (e) {
        expect(e.errors).toEqual([
          'Please provide name',
          'Please select column name',
        ]);
      }
    });
  });

  describe('upload data set', () => {
    let uploadDataSet: () => Promise<void>;
    let file: File;

    beforeEach(() => {
      file = new File(['name,year'], 'test.csv', { type: 'text/csv' });

      uploadDataSet = async (): Promise<void> => {
        await act(async () => {
          fireEvent.drop(
            await screen.findByText('Click to upload a new data set'),
            {
              dataTransfer: {
                files: [file],
              },
            },
          );
        });

        await screen.findByText(
          /Name your data set and select column with values to compare/,
        );

        await act(async () => {
          await userEvent.type(
            await screen.findByLabelText('Name'),
            'Test data set',
          );

          await userEvent.click(await screen.findByLabelText('Column Name'));

          await userEvent.click(
            await screen.findByRole('option', { name: 'year' }),
          );
        });

        await userEvent.click(
          screen.getByRole('button', {
            name: 'Upload',
          }),
        );
      };
    });

    it('should successfully upload new data set', async () => {
      const newDataSetData = DataSetResponseFactory.build();
      mockedAPI.uploadDataSet.mockResolvedValueOnce(({
        data: newDataSetData,
      } as unknown) as AxiosPromise<DataSetResponse>);
      const history = createMemoryHistory();

      renderWithProvider(<UploadDataSet />, {
        withSnackbar: true,
        withRouter: true,
        history,
      });

      await uploadDataSet();

      await waitFor(() =>
        expect(history.location.pathname).toEqual(
          reverse(routes.details, { datasetId: newDataSetData.id }),
        ),
      );

      expect(mockedAPI.uploadDataSet).toHaveBeenCalledTimes(1);
      expect(mockedAPI.uploadDataSet).toHaveBeenCalledWith({
        columnName: 'year',
        file: 'data:text/csv;base64,bmFtZSx5ZWFy',
        name: 'Test data set',
      });
    });

    it('should fail to upload new data set', async () => {
      mockedAPI.uploadDataSet.mockRejectedValueOnce(new Error('test error'));

      renderWithProvider(<UploadDataSet />, {
        withSnackbar: true,
        withRouter: true,
      });

      await uploadDataSet();

      expect(
        await screen.findByText(/Something went wrong. Please try later/),
      ).toBeTruthy();
    });

    it('should cancel upload', async () => {
      mockedAPI.uploadDataSet.mockRejectedValueOnce(new Error('test error'));

      renderWithProvider(<UploadDataSet />, {
        withSnackbar: true,
        withRouter: true,
      });

      await act(async () => {
        fireEvent.drop(
          await screen.findByText('Click to upload a new data set'),
          {
            dataTransfer: {
              files: [file],
            },
          },
        );
      });

      await userEvent.click(
        await screen.findByRole('button', {
          name: 'Cancel',
        }),
      );

      expect(
        await screen.findByText('Click to upload a new data set'),
      ).toBeTruthy();
    });
  });
});
