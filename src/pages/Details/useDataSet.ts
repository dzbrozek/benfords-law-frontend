import { AxiosError } from 'axios';
import useSWR, { responseInterface } from 'swr';

import API from 'api';
import { DataSetResponse } from 'api/types';

const useDataSet = (
  dataSetId: number,
): responseInterface<DataSetResponse, AxiosError> => {
  const fetcher = async (): Promise<DataSetResponse> => {
    const { data } = await API.dataSet(dataSetId);
    return data;
  };
  return useSWR<DataSetResponse, AxiosError>(
    `/data-sets/${dataSetId}/`,
    fetcher,
  );
};

export default useDataSet;
