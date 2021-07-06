import React from 'react';
import { List, Datagrid, TextField, ShowButton } from 'react-admin';

function InternshipAdvisorInternshipProcessList(props) {
  return (
    <List {...props} title="Estagiários">
      <Datagrid>
        <TextField source="intern.name" label="Nome" />
        <TextField source="intern.registrationNumber" label="Matrícula" />
        <TextField source="company.name" label="Empresa" />
        <TextField source="intern.user.email" label="E-mail do estagiário" />
        <TextField source="intern.phoneNumber" label="Telefone do estagiário" />
        <ShowButton label="Mostrar" />
      </Datagrid>
    </List>
  );
}

export default InternshipAdvisorInternshipProcessList;
