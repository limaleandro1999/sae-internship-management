import React from 'react';
import { Create, SimpleForm, TextInput, SelectInput, ReferenceInput, required } from 'react-admin';

const validateName = required('O campo nome é obrigatório');
const validateCourse = required('O campo curso é obrigatório');

function CourseCreate(props) {
  return (
    <Create {...props} title='Novo Curso'>
      <SimpleForm>
        <TextInput source='name' label='Nome' fullWidth={true} validate={validateName}/>
        <TextInput source='code' label='Código' fullWidth={true} validate={validateCourse}/>
        <ReferenceInput source='campus' label='Campus' reference='campi'>
          <SelectInput optionText='name' />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}

export default CourseCreate;