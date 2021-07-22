import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';
import { CustomToolbar } from './CourseCreate';

const validateName = required('O campo nome é obrigatório');

function CourseEdit(props) {
  return (
    <Edit {...props} title="Novo Curso" actions={null}>
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput
          source="name"
          label="Nome"
          fullWidth={true}
          validate={validateName}
        />
      </SimpleForm>
    </Edit>
  );
}

export default CourseEdit;
