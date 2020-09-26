import React from 'react';
import { Admin, Resource } from 'react-admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { CampiCreate, CampiList, CampiEdit, CampiShow } from './components/Campi';
import { CampiAdminCreate, CampiAdminList, CampiAdminEdit, CampiAdminShow } from './components/Campi-Admin';
import CampusAdminConfirmation from './components/Confirmation-Page/CampusAdminConfirmation';

import api from './utils/api';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/finish-create/:confirmationId'>
          <CampusAdminConfirmation/>
        </Route>
      </Switch>
      <Route path='/admin'>
        <Admin dataProvider={api}>
          <Resource name='campi' list={CampiList} create={CampiCreate} edit={CampiEdit} show={CampiShow} options={{ label: 'Campi' }}/>
          <Resource name='campus-admin' list={CampiAdminList} create={CampiAdminCreate} edit={CampiAdminEdit} show={CampiAdminShow} options={{ label: 'Campus Admin' }}/>
        </Admin>
      </Route>
    </Router>
  );
}

export default App;
