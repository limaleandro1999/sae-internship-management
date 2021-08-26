import React from 'react';
import { defaultTheme } from 'react-admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { merge } from 'lodash';

import { Home } from './pages/Home';

import InternshipSectorModule from './pages/Internship-Sector-Module';
import InternModule from './pages/Intern-Module';
import InternshipAdvisorModule from './pages/Internship-Advisor-Module';
import CampusAdminConfirmation from './pages/Confirmation-Page/CampusAdminConfirmation';

import api from './utils/api';
import authProvider from './utils/authService';
import ForgotPassword from './pages/Login/ForgotPassword';
import ResetPassword from './pages/Login/ResetPassword';

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

  document.title = 'SAE - Sistema de Acompanhamento de Estágios';

  return (
    <Router>
      <Switch>
        <Route path="/account-confirmation/:confirmationId">
          <CampusAdminConfirmation />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/reset-password/:userId/:token">
          <ResetPassword />
        </Route>
        <Route path="/internship-sector/admin">
          <InternshipSectorModule
            theme={theme}
            dataProvider={api}
            authProvider={authProvider}
          />
        </Route>
        <Route path="/interns/admin">
          <InternModule
            theme={theme}
            dataProvider={api}
            authProvider={authProvider}
          />
        </Route>
        <Route path="/internship-advisors/admin">
          <InternshipAdvisorModule
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

export default App;
