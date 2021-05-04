import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

function CampusAdminTitle({ record }) {
  return <span>{record ? `${record.name}` : ''}</span>;
}

function CampusAdminShow(props) {
  return (
    <Show {...props} title={<CampusAdminTitle />}>
      <SimpleShowLayout>
        <TextField source="name" label="Nome" />
        <TextField source="user.email" label="Email" />
      </SimpleShowLayout>
    </Show>
  );
}

export default CampusAdminShow;
