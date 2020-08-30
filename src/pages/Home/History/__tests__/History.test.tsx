import { AxiosPromise } from 'axios';
import React from 'react';
import { cache } from 'swr';
import { screen, within } from '@testing-library/react';

import { DataSetResponse } from 'api/types';
import API from 'api';
import { DataSetResponseFactory } from 'tests/factories';
import { renderWithProvider } from 'tests/render';

import History from '../History';

jest.mock('api');

const mockedAPI = API as jest.Mocked<typeof API>;

describe('<History />', () => {
  afterEach(() => {
    cache.clear();
  });

  it('should render error', async () => {
    mockedAPI.dataSets.mockRejectedValueOnce(new Error('test error'));

    renderWithProvider(<History />);

    expect(screen.getByText('History')).toBeTruthy();

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to load history',
    );
  });

  it('should render empty history', async () => {
    mockedAPI.dataSets.mockResolvedValueOnce(({
      data: [],
    } as unknown) as AxiosPromise<DataSetResponse[]>);

    renderWithProvider(<History />);

    expect(screen.getByText('History')).toBeTruthy();

    const table = await screen.findByRole('table');

    expect(within(table).getByText('No data to display')).toBeTruthy();
  });

  it('should render history', async () => {
    mockedAPI.dataSets.mockResolvedValueOnce(({
      data: [
        DataSetResponseFactory.build({
          name: 'Test dataset',
          created: '2020-08-28T14:14:19.072000Z',
        }),
        DataSetResponseFactory.build(),
      ],
    } as unknown) as AxiosPromise<DataSetResponse[]>);

    renderWithProvider(<History />, {
      withRouter: true,
    });

    expect(screen.getByText('History')).toBeTruthy();

    const table = await screen.findByRole('table');
    const rows = within(table).getAllByRole('row');

    expect(rows).toHaveLength(3);

    expect(
      within(rows[0])
        .getAllByRole('columnheader')
        .map((cell) => cell.textContent),
    ).toEqual(['Name', 'Date']);

    expect(
      within(rows[1])
        .getAllByRole('cell')
        .map((cell) => cell.textContent),
    ).toEqual(['Test dataset', 'Aug 28, 2020 4:14 PM']);
  });
});
