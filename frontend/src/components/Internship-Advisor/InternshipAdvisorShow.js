import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

function InternshipAdvisorTitle({ record }) {
  return <span>{record ? `${record.firstName} ${record.lastName}` : ''}</span>;
};

function InternshipAdvisorShow(props) {
  return (
    <Show {...props} title={<InternshipAdvisorTitle/>}>
      <SimpleShowLayout>
        <TextField source='firstName' label='Nome'/>
        <TextField source='lastName' label='Sobrenome'/>
        <TextField source='user.email' label='Email'/>
      </SimpleShowLayout>
    </Show>
  );
}

export default InternshipAdvisorShow;