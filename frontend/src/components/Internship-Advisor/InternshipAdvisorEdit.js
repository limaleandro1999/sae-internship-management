import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';

const validateName = required('O campo nome é obrigatório');

function InternshipAdvisorEdit(props) {
  return (
    <Edit {...props} title='Orientador de Estágio'>
      <SimpleForm>
        <TextInput source='firstName' label='Nome' fullWidth={true} validate={validateName}/>
        <TextInput source='lastName' label='Sobrenome' fullWidth={true} validate={validateName}/>
        <TextInput source='phone' label='Telefone' fullWidth={true} validate={required('Campo obrigatório')}/>
      </SimpleForm>
    </Edit>
  );
}

export default InternshipAdvisorEdit;