import React from 'react';
import { Admin, Resource, defaultTheme } from 'react-admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { merge } from 'lodash';

import { CampiCreate, CampiList, CampiEdit, CampiShow } from './components/Campi';
import { CampusAdminCreate, CampusAdminList, CampusAdminEdit, CampusAdminShow } from './components/Campus-Admin';
import { InternshipSectorCreate, InternshipSectorList, InternshipSectorEdit, InternshipSectorShow } from './components/Internship-Sector';
import { CourseCreate, CourseEdit, CourseList, CourseShow } from './components/Course';
import { CompanyCreate, CompanyEdit, CompanyList, CompanyShow } from './components/Company';

import CampusAdminConfirmation from './components/Confirmation-Page/CampusAdminConfirmation';

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

  return (
    <Router>
      <Switch>
        <Route path='/account-confirmation/:confirmationId'>
          <CampusAdminConfirmation/>
        </Route>
      </Switch>
      <Route path='/admin'>
        <Admin theme={theme} dataProvider={api} authProvider={authProvider}>
          { permissions => [
            ['Admin'].includes(permissions) ? <Resource name='campi' list={CampiList} create={CampiCreate} edit={CampiEdit} show={CampiShow} options={{ label: 'Campi' }}/> : null,
            ['Admin', 'Campus_Admin'].includes(permissions) ? <Resource name='campus-admin' list={CampusAdminList} create={CampusAdminCreate} edit={CampusAdminEdit} show={CampusAdminShow} options={{ label: 'Adm. de Campus' }}/> : null,
            ['Admin', 'Campus_Admin'].includes(permissions) ? <Resource name='internship-sector' list={InternshipSectorList} create={InternshipSectorCreate} edit={InternshipSectorEdit} show={InternshipSectorShow} options={{ label: 'Setor de Estágio' }}/> : null,
            ['Admin', 'Campus_Admin', 'Internship-Sector'].includes(permissions) ? <Resource name='courses' list={CourseList} create={CourseCreate} edit={CourseEdit} show={CourseShow} options={{ label: 'Cursos' }}/> : null,
            ['Admin', 'Campus_Admin', 'Internship-Sector'].includes(permissions) ? <Resource name='companies' list={CompanyList} create={CompanyCreate} edit={CompanyEdit} show={CompanyShow} options={{ label: 'Empresa' }}/> : null,
          ]}
        </Admin>
      </Route>
    </Router>
  );
}

export default App;
