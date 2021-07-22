import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  required,
  Toolbar,
  SaveButton,
} from 'react-admin';
import { ROLES } from '../../utils/roles';

const validateName = required('O campo nome é obrigatório');

export const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton label="Salvar" />
  </Toolbar>
);

function CourseCreate(props) {
  const userType = localStorage.getItem('role');

  return (
    <Create {...props} title="Novo Curso">
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput
          source="name"
          label="Nome"
          fullWidth={true}
          validate={validateName}
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

export default CourseCreate;
