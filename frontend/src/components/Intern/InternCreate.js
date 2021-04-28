import React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, DateInput, required, email } from 'react-admin';
import { ROLES } from '../../utils/roles';

function InternCreate(props) {
  const userType = localStorage.getItem('role');

  return (
    <Create {...props} title='Novo Orientador de Estágio'>
      <SimpleForm>
        <TextInput source='name' label='Nome' fullWidth={true} validate={required('Campo é obrigatório')} />
        <TextInput source='email' label='Email' fullWidth={true} validate={[required('Campo é obrigatório'), email('E-mail inválido')]} />
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
        <TextInput source='responsible' fullWidth={true} label='Responsável'/>
        {
          userType === ROLES.ADMIN ?
            <ReferenceInput source='campus' label='Campus' reference='campi'>
              <SelectInput optionText='name' />
            </ReferenceInput>
          : null
        }
        <ReferenceInput source='course' label='Curso' reference='courses'>
          <SelectInput optionText='name' />
        </ReferenceInput>
        <SelectInput source='shift' label='Turno' validate={required('Campo é obrigatório')} choices={[
          { id: 'Manha', name: 'Manhã' },
          { id: 'Vespertino', name: 'Vespertino' },
          { id: 'Noite', name: 'Noite' },
          { id: 'Integral', name: 'Integral' },
        ]} />
      </SimpleForm>
    </Create>
  );
}

export default InternCreate;