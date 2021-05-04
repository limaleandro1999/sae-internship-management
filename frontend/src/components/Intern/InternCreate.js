import React from 'react';
import { Create } from 'react-admin';

import InternForm from './InternForm';

function InternCreate(props) {
  return (
    <Create {...props} title="Novo Orientador de Estágio">
      <InternForm isCreateForm />
    </Create>
  );
}

export default InternCreate;
