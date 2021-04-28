import React from 'react';
import { Show, SimpleShowLayout, TextField, DateField } from 'react-admin';

function InternTitle({ record }) {
  return <span>{record ? `${record.name}` : ''}</span>;
};

function InternShow(props) {
  return (
    <Show {...props} title={<InternTitle/>}>
      <SimpleShowLayout>
        <TextField source='name' label='Nome'/>
        <TextField source='user.email' label='Email'/>
        <TextField source='cpf' label='CPF'/>
        <TextField source='rg' label='RG'/>
        <DateField source='birthDate' label='Data de Nascimento'/>
        <TextField source='address' label='Endereço'/>
        <TextField source='district' label='Bairro'/>
        <TextField source='city' label='Cidade'/>
        <TextField source='state' label='Estado'/>
        <TextField source='cep' label='CEP'/>
        <TextField source='phoneNumber' label='Telefone'/>
        <TextField source='shift' label='Turno'/>
        <TextField source='registrationNumber' label='Matrícula'/>
        <TextField source='coursePeriod' label='Período'/>
        <TextField source='responsible' label='Responsável'/>
        <TextField source='course.name' label='Curso'/>    
      </SimpleShowLayout>
    </Show>
  );
}

export default InternShow;