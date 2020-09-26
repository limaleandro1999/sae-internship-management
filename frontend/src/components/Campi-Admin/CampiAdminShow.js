import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

function CampusAdminTitle({ record }) {
  return <span>{record ? `${record.name}` : ''}</span>;
};

function CampiAdminShow(props) {
  return (
    <Show {...props} title={<CampusAdminTitle/>}>
      <SimpleShowLayout>
        <TextField source='name' label='Nome'/>
        <TextField source='email' label='Email'/>
      </SimpleShowLayout>
    </Show>
  );
}

export default CampiAdminShow;