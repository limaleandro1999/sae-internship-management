import React from 'react';
import { Edit } from 'react-admin';

import CompanyForm from './CompanyForm';

function CompanyEdit(props) {
  return (
    <Edit {...props} title="Editar Empresa">
      <CompanyForm />
    </Edit>
  );
}

export default CompanyEdit;
