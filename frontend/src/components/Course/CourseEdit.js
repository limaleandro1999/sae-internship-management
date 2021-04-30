import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';

const validateName = required('O campo nome é obrigatório');
const validateCourse = required('O campo curso é obrigatório');

function CourseEdit(props) {
  return (
    <Edit {...props} title="Novo Curso">
      <SimpleForm>
        <TextInput
          source="name"
          label="Nome"
          fullWidth={true}
          validate={validateName}
        />
        <TextInput
          source="code"
          label="Código"
          fullWidth={true}
          validate={validateCourse}
        />
      </SimpleForm>
    </Edit>
  );
}

export default CourseEdit;
