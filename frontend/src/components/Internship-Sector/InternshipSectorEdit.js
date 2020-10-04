import React from 'react';
import { Edit, SimpleForm, TextInput, required, email } from 'react-admin';

const validateName = required('O campo nome é obrigatório');
const validateRegistrationNumber = required('O campo matrícula é obrigatório');
const validateEmail = [required('O campo email é obrigatório'), email('Email inválido')];

function InternshipSectorEdit(props) {
  return (
    <Edit {...props} title='Usuário Setor de Estágio'>
      <SimpleForm>
        <TextInput source='firstName' label='Nome' fullWidth={true} validate={validateName}/>
        <TextInput source='lastName' label='Sobrenome' fullWidth={true} validate={validateName}/>
        <TextInput source='email' label='Email' fullWidth={true} validate={validateEmail}/>
        <TextInput source='registrationNumber' label='Matrícula' fullWidth={true} validate={validateRegistrationNumber}/>
      </SimpleForm>
    </Edit>
  );
}

export default InternshipSectorEdit;