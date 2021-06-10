import React from 'react';
import { Edit } from 'react-admin';
import InternshipProcessForm from './InternshipProcessForm';

function InternshipProcessEdit(props) {
  return (
    <Edit {...props} title="Editar Processo de Estágio">
      <InternshipProcessForm isCreateForm={false} />
    </Edit>
  );
}

export default InternshipProcessEdit;
