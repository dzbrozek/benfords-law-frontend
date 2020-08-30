import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { reverse } from 'named-urls';
import format from 'date-fns/format';

import routes from 'core/routes';

import useDataSets from './useDataSets';
import { TableLink } from './styles';

const History = (): React.ReactElement => {
  const { data: dataSetsData, error: dataSetsError } = useDataSets();
  let content = null;

  if (!dataSetsData && !dataSetsError) {
    content = (
      <Box justifyContent="center" display="flex" padding={2}>
        <CircularProgress />
      </Box>
    );
  } else if (dataSetsError) {
    content = <Alert severity="error">Unable to load history</Alert>;
  } else if (dataSetsData) {
    content = (
      <Table aria-label="history table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSetsData.length ? (
            dataSetsData.map((dataSet) => (
              <TableRow key={dataSet.id}>
                <TableCell>
                  <TableLink
                    to={reverse(routes.details, { datasetId: dataSet.id })}>
                    {dataSet.name}
                  </TableLink>
                </TableCell>
                <TableCell align="right">
                  {format(new Date(dataSet.created), 'PP p')}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>No data to display</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }

  return (
    <>
      <Box marginBottom={2}>
        <Typography variant="h6" component="div">
          History
        </Typography>
      </Box>

      {content}
    </>
  );
};

export default History;
