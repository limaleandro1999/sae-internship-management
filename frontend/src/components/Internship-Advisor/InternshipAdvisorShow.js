import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

function InternshipAdvisorTitle({ record }) {
  return <span>{record ? record.name : ''}</span>;
}

function InternshipAdvisorShow(props) {
  return (
    <Show {...props} title={<InternshipAdvisorTitle />}>
      <SimpleShowLayout>
        <TextField source="name" label="Nome" />
        <TextField source="user.email" label="Email" />
      </SimpleShowLayout>
    </Show>
  );
}

export default InternshipAdvisorShow;
