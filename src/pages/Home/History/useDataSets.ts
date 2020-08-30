import { AxiosError } from 'axios';
import useSWR, { responseInterface } from 'swr';

import API from 'api';
import { DataSetResponse } from 'api/types';

const useDataSets = (): responseInterface<DataSetResponse[], AxiosError> => {
  const fetcher = async (): Promise<DataSetResponse[]> => {
    const { data } = await API.dataSets();
    return data;
  };
  return useSWR<DataSetResponse[], AxiosError>('/data-sets/', fetcher);
};

export default useDataSets;
