import Box from '@material-ui/core/Box';
import React from 'react';

import History from './History';
import UploadDataSet from './UploadDataSet';

const Home = (): React.ReactElement => {
  return (
    <>
      <Box marginBottom={4}>
        <UploadDataSet />
      </Box>
      <History />
    </>
  );
};

export default Home;
