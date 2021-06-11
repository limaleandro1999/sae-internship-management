import React from 'react';
import { Create } from 'react-admin';
import InternshipProcessForm from './InternshipProcessForm';

function InternshipProcessCreate(props) {
  return (
    <Create {...props} title="Novo Processo de Estágio">
      <InternshipProcessForm isCreateForm={true} />
    </Create>
  );
}

export default InternshipProcessCreate;
