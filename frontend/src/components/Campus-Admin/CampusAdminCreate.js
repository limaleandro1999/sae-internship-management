import React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, required, email } from 'react-admin';
import { ROLES } from '../../utils/roles';

const validateName = required('O campo nome é obrigatório');
const validateEmail = [required('O campo email é obrigatório'), email('Email inválido')];

function CampusAdminCreate(props) {
  const userType = localStorage.getItem('role');

  return (
    <Create {...props} title='Novo Campus'>
      <SimpleForm>
        <TextInput source='firstName' label='Nome' fullWidth={true} validate={validateName}/>
        <TextInput source='lastName' label='Sobrenome' fullWidth={true} validate={validateName}/>
        <TextInput source='email' label='Email' fullWidth={true} validate={validateEmail}/>
        {
          userType === ROLES.ADMIN ?
            <ReferenceInput source='campus' label='Campus' reference='campi'>
              <SelectInput optionText='name' />
            </ReferenceInput>
          : null
        }
      </SimpleForm>
    </Create>
  );
}

export default CampusAdminCreate;