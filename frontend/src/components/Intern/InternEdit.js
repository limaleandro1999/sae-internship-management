import React from 'react';
import { Edit, SimpleForm, TextInput, SelectInput, DateInput, ReferenceInput, required } from 'react-admin';

function InternTitle({ record }) {
  return <span>{record ? `${record.name}` : ''}</span>;
};

function InternEdit(props) {
  return (
    <Edit {...props} title={<InternTitle/>}>
      <SimpleForm>
      <TextInput source='name' label='Nome' fullWidth={true} validate={required('Campo é obrigatório')} />
        <TextInput source='cpf' label='CPF' fullWidth={true} validate={required('Campo é obrigatório')} />
        <TextInput source='rg' label='RG' fullWidth={true} validate={required('Campo é obrigatório')} />
        <DateInput source='birthDate' label='Data de Nascimento' fullWidth={true} validate={required('Campo é obrigatório')} />
        <TextInput source='address' label='Endereço' fullWidth={true} validate={required('Campo é obrigatório')} />
        <TextInput source='district' label='Bairro' fullWidth={true} validate={required('Campo é obrigatório')} />
        <TextInput source='city' label='Cidade' fullWidth={true} validate={required('Campo é obrigatório')} />
        <TextInput source='state' label='Estado' fullWidth={true} validate={required('Campo é obrigatório')} />
        <TextInput source='cep' label='CEP' fullWidth={true} validate={required('Campo é obrigatório')} />
        <TextInput source='phoneNumber' label='Telefone' fullWidth={true} validate={required('Campo é obrigatório')} />
        <TextInput source='registrationNumber' label='Matrícula' fullWidth={true} validate={required('Campo é obrigatório')} />
        <TextInput source='coursePeriod' label='Período' fullWidth={true} validate={required('Campo é obrigatório')} />
        <TextInput source='responsible' label='Responsável'/>
        <ReferenceInput source='course' label='Curso' reference='courses'>
          <SelectInput optionText='name' />
        </ReferenceInput>
        <SelectInput source='shift' label='Turno' fullWidth={true} validate={required('Campo é obrigatório')} choices={[
          { id: 'Manha', name: 'Manhã' },
          { id: 'Vespertino', name: 'Vespertino' },
          { id: 'Noite', name: 'Noite' },
          { id: 'Integral', name: 'Integral' },
        ]} />
      </SimpleForm>
    </Edit>
  );
}

export default InternEdit;