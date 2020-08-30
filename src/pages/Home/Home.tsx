import React from 'react';

import History from './History';
import UploadDataSet from './UploadDataSet';

const Home = (): React.ReactElement => {
  return (
    <>
      <UploadDataSet />
      <History />
    </>
  );
};

export default Home;
