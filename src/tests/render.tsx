import { ThemeProvider as MUIThemeProvider } from '@material-ui/styles';
import { MemoryHistory } from 'history/createMemoryHistory';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/macro';
import { SWRConfig } from 'swr';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import MUITheme from 'theme/mui';

interface Config {
  withRouter?: boolean;
  withSnackbar?: boolean;
  history?: MemoryHistory;
}

const TestFragment = ({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement => {
  return <>{children}</>;
};

export function renderWithProvider(
  component: React.ReactElement,
  {
    withSnackbar = false,
    withRouter = false,
    history = createMemoryHistory(),
  }: Config = {},
): RenderResult {
  const Wrapper: React.FunctionComponent = ({ children }) => {
    const SnackbarComponent = withSnackbar ? SnackbarProvider : TestFragment;
    const RouterComponent = withRouter ? Router : TestFragment;

    return (
      <StyledThemeProvider theme={MUITheme}>
        <MUIThemeProvider theme={MUITheme}>
          <SWRConfig
            value={{
              dedupingInterval: 0,
            }}>
            <SnackbarComponent>
              <RouterComponent history={history}>{children}</RouterComponent>
            </SnackbarComponent>
          </SWRConfig>
        </MUIThemeProvider>
      </StyledThemeProvider>
    );
  };
  return {
    ...render(component, { wrapper: Wrapper }),
  };
}
