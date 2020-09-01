import React from 'react';
import { Admin, Resource } from 'react-admin';

import CampiList from './components/Campi/CampiList';

import api from './utils/api';

function App() {
  return (
   <Admin dataProvider={api}>
     <Resource name='campi' list={CampiList} options={{ label: 'Campi' }}/>
   </Admin>
  );
}

export default App;
