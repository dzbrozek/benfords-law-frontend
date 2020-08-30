import { AxiosPromise } from 'axios';
import React from 'react';
import { screen } from '@testing-library/react';
import { cache } from 'swr';

import { DataSetResponse } from 'api/types';
import { DataSetResponseFactory } from 'tests/factories';
import { renderWithProvider } from 'tests/render';
import API from 'api';

import Details, { calcDistribution } from '../Details';

jest.mock('api');

const mockedAPI = API as jest.Mocked<typeof API>;

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useRouteMatch: () => ({
    params: {
      datasetId: 13,
    },
  }),
}));

describe('<Details />', () => {
  afterEach(() => {
    cache.clear();
    jest.clearAllMocks();
  });

  it('should render error', async () => {
    mockedAPI.dataSet.mockRejectedValueOnce(new Error('test error'));

    renderWithProvider(<Details />, {
      withRouter: true,
    });

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to load details',
    );
  });

  it('should render details', async () => {
    mockedAPI.dataSet.mockResolvedValueOnce(({
      data: DataSetResponseFactory.build({
        name: 'Test dataset',
      }),
    } as unknown) as AxiosPromise<DataSetResponse>);

    renderWithProvider(<Details />, {
      withRouter: true,
    });

    expect(await screen.findByText('Test dataset')).toBeTruthy();

    expect(screen.getByRole('img')).toBeTruthy();

    expect(mockedAPI.dataSet).toHaveBeenCalledTimes(1);
    expect(mockedAPI.dataSet).toHaveBeenCalledWith(13);
  });

  it('should calc distribution', () => {
    expect(
      calcDistribution({
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
      }),
    ).toEqual({
      '1': 10,
      '2': 20,
      '3': 30,
      '4': 40,
    });
  });
});
