import React from 'react';
import { Admin, Resource } from 'react-admin';
import { useHistory } from 'react-router-dom';
import { CLIENT_ALLOWED_ROLES } from '../../utils/roles';
import { InternDashboard } from '../../components/Intern-Dashboard';

function InternModule({ theme, dataProvider, authProvider }) {
  const userRole = localStorage.getItem('role');
  const currentClient = window.location.pathname.split('/')[1];
  const history = useHistory();

  if (userRole && !CLIENT_ALLOWED_ROLES[currentClient].includes(userRole)) {
    const clientIndex = Object.values(
      CLIENT_ALLOWED_ROLES
    ).findIndex((allowedRoles) => allowedRoles.includes(userRole));
    const clientArray = Object.keys(CLIENT_ALLOWED_ROLES);
    const userClient = clientArray[clientIndex];
    console.log('aqui???', userRole);
    history.push(`/${userClient}/admin`);
  }

  return (
    <Admin
      theme={theme}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource
        name="dashboard"
        options={{ label: 'Início' }}
        list={InternDashboard}
      />
    </Admin>
  );
}

export default InternModule;