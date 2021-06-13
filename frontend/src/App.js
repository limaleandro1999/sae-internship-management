import React from 'react';
import { defaultTheme } from 'react-admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { merge } from 'lodash';

import { Home } from './pages/Home';

import InternshipSectorModule from './pages/Internship-Sector-Module';
import CampusAdminConfirmation from './pages/Confirmation-Page/CampusAdminConfirmation';

import api from './utils/api';
import authProvider from './utils/authService';

function App() {
  const theme = merge({}, defaultTheme, {
    palette: {
      secondary: {
        dark: '#086218',
        light: '#086218',
        main: '#086218',
      },
    },
  });

  document.title = getPageTitle();

  return (
    <Router>
      <Switch>
        <Route path="/account-confirmation/:confirmationId">
          <CampusAdminConfirmation />
        </Route>
        <Route path="/admin">
          <InternshipSectorModule
            theme={theme}
            dataProvider={api}
            authProvider={authProvider}
          />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function getPageTitle() {
  if (window.location.pathname.includes('/admin')) {
    return 'Painel Administrativo';
  }

  if (window.location.pathname.includes('/account-confirmation')) {
    return 'Confirme sua conta!';
  }

  return '';
}

export default App;
