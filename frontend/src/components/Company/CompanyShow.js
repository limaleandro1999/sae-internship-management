import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';
import { Typography } from '@material-ui/core';

function CompanyTitle({ record }) {
  return <span>{record ? `${record.name}` : ''}</span>;
}

function CompanyShow(props) {
  return (
    <Show {...props} title={<CompanyTitle />}>
      <SimpleShowLayout>
        <Typography variant="h6" gutterBottom>
          Dados da empresa
        </Typography>
        <TextField source="name" label="Nome" />
        <TextField source="directorName" label="Nome do diretor" />
        <TextField source="cnpj" label="CNPJ" />
        <TextField source="stateRegistration" label="Inscrição Estadual" />
        <TextField source="address" label="Endereço" />
        <TextField source="district" label="Bairro" />
        <TextField source="cep" label="CEP" />
        <TextField source="state" label="Estado" />
        <TextField source="city" label="Cidade" />
        <TextField source="email" label="E-mail" />
        <TextField source="phone" label="Telefone" />
        <TextField source="industry" label="Ramo de Atividade" />
        <TextField
          source="internshipAreaInterest"
          label="Área de interesse de estágio"
        />

        <Typography variant="h6" gutterBottom>
          Dados do representante
        </Typography>
        <TextField source="representative" label="Nome do representante" />
        <TextField source="office" label="Cargo" />
        <TextField source="sector" label="Setor" />
      </SimpleShowLayout>
    </Show>
  );
}

export default CompanyShow;
