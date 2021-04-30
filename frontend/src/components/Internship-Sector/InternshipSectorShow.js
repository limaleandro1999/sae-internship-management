import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

function InternshipSectorTitle({ record }) {
  return <span>{record ? `${record.name}` : ''}</span>;
}

function InternshipSectorShow(props) {
  return (
    <Show {...props} title={<InternshipSectorTitle />}>
      <SimpleShowLayout>
        <TextField source="firstName" label="Nome" />
        <TextField source="lastName" label="Sobrenome" />
        <TextField source="user.email" label="Email" />
      </SimpleShowLayout>
    </Show>
  );
}

export default InternshipSectorShow;
