import React from 'react';
import { Admin, Resource } from 'react-admin';

import { CampiCreate, CampiList, CampiEdit, CampiShow } from './components/Campi';

import api from './utils/api';


function App() {
  return (
   <Admin dataProvider={api}>
     <Resource name='campi' list={CampiList} create={CampiCreate} edit={CampiEdit} show={CampiShow} options={{ label: 'Campi' }}/>
   </Admin>
  );
}

export default App;
