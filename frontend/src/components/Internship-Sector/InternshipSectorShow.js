import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

function InternshipSectorTitle({ record }) {
  return <span>{record ? `${record.name}` : ''}</span>;
}

function InternshipSectorShow(props) {
  return (
    <Show {...props} title={<InternshipSectorTitle />} actions={null}>
      <SimpleShowLayout>
        <TextField source="name" label="Nome" />
        <TextField source="user.email" label="Email" />
      </SimpleShowLayout>
    </Show>
  );
}

export default InternshipSectorShow;
