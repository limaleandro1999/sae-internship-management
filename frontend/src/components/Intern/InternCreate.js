import React from 'react';
import { Create } from 'react-admin';

import InternForm from './InternForm';

function InternCreate(props) {
  // const userType = localStorage.getItem('role');

  return (
    <Create {...props} title="Novo Orientador de Estágio">
      <InternForm />
    </Create>
  );
}

export default InternCreate;
