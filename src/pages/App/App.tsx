import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/macro';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { SWRConfig } from 'swr';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

import MUITheme from 'theme/mui';

import NavBar from './NavBar';
import Routing from './Routing';

const history = createBrowserHistory();

function App(): React.ReactElement {
  return (
    <StyledThemeProvider theme={MUITheme}>
      <MUIThemeProvider theme={MUITheme}>
        <CssBaseline />

        <SWRConfig
          value={{
            revalidateOnFocus: false,
          }}>
          <SnackbarProvider maxSnack={3}>
            <Router history={history}>
              <NavBar />

              <Routing />
            </Router>
          </SnackbarProvider>
        </SWRConfig>
      </MUIThemeProvider>
    </StyledThemeProvider>
  );
}

export default App;
