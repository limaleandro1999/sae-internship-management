import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

function CampusTitle({ record }) {
  return <span>{record ? `${record.name}` : ''}</span>;
}

function CampiShow(props) {
  return (
    <Show {...props} title={<CampusTitle />}>
      <SimpleShowLayout>
        <TextField source="name" label="Nome" />
        <TextField source="emailAddress" label="Email" />
        <TextField source="phone" label="Telefone" />
        <TextField source="city" label="Cidade" />
        <TextField source="address" label="Endereço" />
      </SimpleShowLayout>
    </Show>
  );
}

export default CampiShow;
