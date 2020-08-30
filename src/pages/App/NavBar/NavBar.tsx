import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';

import routes from 'core/routes';

import { Title } from './styles';

const NavBar = (): React.ReactElement => {
  const title = "Benford's law";
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link to={routes.home}>
            <Title variant="h6">{title}</Title>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
