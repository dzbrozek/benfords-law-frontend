import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithProvider } from 'tests/render';

import NavBar from '../NavBar';

describe('<NavBar />', () => {
  it('should render component', async () => {
    renderWithProvider(<NavBar />, {
      withRouter: true,
    });

    expect(screen.getByText("Benford's law")).toBeTruthy();
  });
});
