import React from 'react';
import { Create } from 'react-admin';

import CompanyForm from './CompanyForm';

function CompanyCreate(props) {
  return (
    <Create {...props} title="Nova Empresa">
      <CompanyForm />
    </Create>
  );
}

export default CompanyCreate;
