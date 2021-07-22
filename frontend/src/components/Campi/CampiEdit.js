import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  email,
} from 'react-admin';

import cities from '../../utils/cities.json';
import { CustomToolbar } from '../Course/CourseCreate';

const formCities = cities.map((city) => ({
  id: city.toLowerCase(),
  name: city,
}));

const validateName = required('O campo nome é obrigatório');
const validateEmail = [
  required('O campo email é obrigatório'),
  email('Email inválido'),
];
const validatePhone = required('O campo telefone é obrigatório');
const validateCity = required('O campo cidade é obrigatório');
const validateAddress = required('O campo endereço é obrigatório');

function CampiEdit(props) {
  return (
    <Edit {...props} title="Edit Campus" actions={null}>
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput
          source="name"
          label="Nome"
          fullWidth={true}
          validate={validateName}
        />
        <TextInput
          source="emailAddress"
          label="Email"
          fullWidth={true}
          validate={validateEmail}
        />
        <TextInput source="phone" label="Telefone" validate={validatePhone} />
        <SelectInput
          source="city"
          label="Cidade"
          choices={formCities}
          validate={validateCity}
        />
        <TextInput
          source="address"
          label="Endereço"
          fullWidth={true}
          validate={validateAddress}
          resettable={true}
        />
      </SimpleForm>
    </Edit>
  );
}

export default CampiEdit;
