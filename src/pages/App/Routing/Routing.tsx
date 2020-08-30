import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from 'core/routes';
import Home from 'pages/Home';
import PageNotFound from 'pages/PageNotFound';
import Details from 'pages/Details';

const Routing = (): React.ReactElement => {
  return (
    <Switch>
      <Route path={routes.home} component={Home} exact />

      <Route path={routes.details} component={Details} exact />

      <Route component={PageNotFound} path="*" />
    </Switch>
  );
};

export default Routing;
