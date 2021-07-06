import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';

const validateName = required('O campo nome é obrigatório');

function InternshipAdvisorTitle({ record }) {
  return <span>{record ? record.name : ''}</span>;
}

function InternshipAdvisorEdit(props) {
  return (
    <Edit {...props} title={<InternshipAdvisorTitle />}>
      <SimpleForm>
        <TextInput
          source="name"
          label="Nome"
          fullWidth={true}
          validate={validateName}
        />
        <TextInput
          source="phone"
          label="Telefone"
          fullWidth={true}
          validate={required('Campo obrigatório')}
        />
        <TextInput
          source="siape"
          label="SIAPE"
          fullWidth={true}
          validate={required('Campo obrigatório')}
        />
      </SimpleForm>
    </Edit>
  );
}

export default InternshipAdvisorEdit;
