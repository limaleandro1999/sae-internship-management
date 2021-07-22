import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

function InternshipAdvisorTitle({ record }) {
  return <span>{record ? record.name : ''}</span>;
}

function InternshipAdvisorShow(props) {
  return (
    <Show {...props} title={<InternshipAdvisorTitle />} actions={null}>
      <SimpleShowLayout>
        <TextField source="name" label="Nome" />
        <TextField source="phone" label="Telefone" />
        <TextField source="siape" label="SIAPE" />
        <TextField source="user.email" label="Email" />
      </SimpleShowLayout>
    </Show>
  );
}

export default InternshipAdvisorShow;
