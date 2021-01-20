import React from 'react';
import { Admin, Resource, defaultTheme } from 'react-admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { merge } from 'lodash';

import { CampiCreate, CampiList, CampiEdit, CampiShow } from './components/Campi';
import { CampusAdminCreate, CampusAdminList, CampusAdminEdit, CampusAdminShow } from './components/Campus-Admin';
import { InternshipSectorCreate, InternshipSectorList, InternshipSectorEdit, InternshipSectorShow } from './components/Internship-Sector';
import { CourseCreate, CourseEdit, CourseList, CourseShow } from './components/Course';
import CampusAdminConfirmation from './components/Confirmation-Page/CampusAdminConfirmation';

import api from './utils/api';

function App() {
  console.log(defaultTheme)
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
        <Admin theme={theme} dataProvider={api}>
          <Resource name='campi' list={CampiList} create={CampiCreate} edit={CampiEdit} show={CampiShow} options={{ label: 'Campi' }}/>
          <Resource name='campus-admin' list={CampusAdminList} create={CampusAdminCreate} edit={CampusAdminEdit} show={CampusAdminShow} options={{ label: 'Adm. de Campus' }}/>
          <Resource name='internship-sector' list={InternshipSectorList} create={InternshipSectorCreate} edit={InternshipSectorEdit} show={InternshipSectorShow} options={{ label: 'Setor de Estágio' }}/>
          <Resource name='courses' list={CourseList} create={CourseCreate} edit={CourseEdit} show={CourseShow} options={{ label: 'Cursos' }}/>
        </Admin>
      </Route>
    </Router>
  );
}

export default App;
