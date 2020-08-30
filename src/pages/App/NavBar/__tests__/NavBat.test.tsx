import React from 'react';
import { screen, act, render } from '@testing-library/react';

import NavBar from '../NavBar';

describe('<NavBar />', () => {
  it('should render component', async () => {
    await act(async () => {
      render(<NavBar />);
    });

    expect(screen.getByText("Benford's law")).toBeTruthy();
  });
});
