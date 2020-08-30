import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import routes from 'core/routes';

import { Title, TitleLink } from './styles';

const NavBar = (): React.ReactElement => {
  const title = "Benford's law";
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <TitleLink to={routes.home}>
            <Title variant="h6">{title}</Title>
          </TitleLink>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
