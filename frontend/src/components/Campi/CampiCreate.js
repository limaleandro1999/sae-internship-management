import React from 'react';
import { Create, SimpleForm, TextInput, SelectInput, required, email } from 'react-admin';

import cities from '../../utils/cities.json';

const formCities = cities.map(city => ({ id: city.toLowerCase(), name: city }));

const validateName = required('O campo nome é obrigatório');
const validateEmail = [required('O campo email é obrigatório'), email('Email inválido')];
const validatePhone = required('O campo telefone é obrigatório');
const validateCity = required('O campo cidade é obrigatório');
const validateAddress = required('O campo endereço é obrigatório');

function CampiCreate(props) {
  return (
    <Create {...props} title='Novo Campus'>
      <SimpleForm>
        <TextInput source='name' label='Nome' fullWidth={true} validate={validateName}/>
        <TextInput source='emailAddress' label='Email' fullWidth={true} validate={validateEmail}/>
        <TextInput source='phone' label='Telefone' validate={validatePhone}/>
        <SelectInput source='city' label='Cidade' choices={formCities} validate={validateCity}/>
        <TextInput source='address' label='Endereço' fullWidth={true} validate={validateAddress} resettable={true}/>
      </SimpleForm>
    </Create>
  );
}

export default CampiCreate;