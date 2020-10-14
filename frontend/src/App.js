import React from 'react';
import { Admin, Resource } from 'react-admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { CampiCreate, CampiList, CampiEdit, CampiShow } from './components/Campi';
import { CampusAdminCreate, CampusAdminList, CampusAdminEdit, CampusAdminShow } from './components/Campus-Admin';
import { InternshipSectorCreate, InternshipSectorList, InternshipSectorEdit, InternshipSectorShow } from './components/Internship-Sector';
import CampusAdminConfirmation from './components/Confirmation-Page/CampusAdminConfirmation';

import api from './utils/api';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/account-confirmation/:confirmationId'>
          <CampusAdminConfirmation/>
        </Route>
      </Switch>
      <Route path='/admin'>
        <Admin dataProvider={api}>
          <Resource name='campi' list={CampiList} create={CampiCreate} edit={CampiEdit} show={CampiShow} options={{ label: 'Campi' }}/>
          <Resource name='campus-admin' list={CampusAdminList} create={CampusAdminCreate} edit={CampusAdminEdit} show={CampusAdminShow} options={{ label: 'Administrador de Campus' }}/>
          <Resource name='internship-sector' list={InternshipSectorList} create={InternshipSectorCreate} edit={InternshipSectorEdit} show={InternshipSectorShow} options={{ label: 'Setor de Estágio' }}/>
        </Admin>
      </Route>
    </Router>
  );
}

export default App;
