import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { useRouteMatch } from 'react-router';
import { useTheme } from 'styled-components/macro';

import { DataSetResponse } from 'api/types';
import benfordDistribution from 'core/benfordDistribution';

import useDataSet from './useDataSet';
import DistributionChart from './DistributionChart';

export const calcDistribution = (
  frequency: Record<string, number>,
): Record<string, number> => {
  const calc: Record<string, number> = {};
  const sum = Object.values(frequency).reduce((prev, curr) => prev + curr, 0);
  for (const key of Object.keys(frequency)) {
    calc[key] = (frequency[key] / sum) * 100;
  }
  return calc;
};

const Details = (): React.ReactElement => {
  const theme = useTheme();
  const {
    params: { datasetId },
  } = useRouteMatch<{ datasetId: string }>();
  const { data: dataSetData, error: dataSetError } = useDataSet(
    Number(datasetId),
  );

  const expectedDistribution = React.useMemo(
    () =>
      Object.entries(benfordDistribution()).map(([key, value]) => ({
        x: key,
        y: value,
        label: `${value.toFixed(1)}%`,
      })),
    [],
  );

  if (!dataSetData && !dataSetError) {
    return (
      <Box justifyContent="center" display="flex" padding={2}>
        <CircularProgress />
      </Box>
    );
  }
  if (dataSetError) {
    return <Alert severity="error">Unable to load details</Alert>;
  }

  const dataSetResponseData = dataSetData as DataSetResponse;
  const actualDistribution = Object.entries(
    calcDistribution(dataSetResponseData.distribution),
  ).map(([key, value]) => ({
    x: key,
    y: value,
    label: `${value.toFixed(1)}%`,
  }));
  return (
    <>
      <Box marginBottom={2}>
        <Typography variant="h6" component="div">
          {dataSetResponseData.name}
        </Typography>
      </Box>

      <Box justifyContent="center" display="flex">
        <Box width="600px">
          <DistributionChart
            expectedData={expectedDistribution}
            actualData={actualDistribution}
            labels={['Expected', 'Actual']}
            colorScale={[
              theme.palette.primary.main,
              theme.palette.secondary.main,
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Details;
