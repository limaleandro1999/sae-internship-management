import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
  email,
} from 'react-admin';
import { ROLES } from '../../utils/roles';
import { CustomToolbar } from '../Course/CourseCreate';

const validateName = required('O campo nome é obrigatório');
const validateEmail = [
  required('O campo email é obrigatório'),
  email('Email inválido'),
];

function InternshipAdvisorCreate(props) {
  const userType = localStorage.getItem('role');

  return (
    <Create {...props} title="Novo Orientador de Estágio">
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput
          source="name"
          label="Nome"
          fullWidth={true}
          validate={validateName}
        />
        <TextInput
          source="email"
          label="Email"
          fullWidth={true}
          validate={validateEmail}
        />
        <TextInput
          source="phone"
          label="Telefone"
          fullWidth={true}
          validate={required('Campo é obrigatório')}
        />
        <TextInput
          source="siape"
          label="SIAPE"
          fullWidth={true}
          validate={required('Campo obrigatório')}
        />
        {userType === ROLES.ADMIN ? (
          <ReferenceInput source="campus" label="Campus" reference="campi">
            <SelectInput optionText="name" />
          </ReferenceInput>
        ) : null}
      </SimpleForm>
    </Create>
  );
}

export default InternshipAdvisorCreate;
