import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  // EditButton,
  // ShowButton,
  Filter,
} from 'react-admin';

function InternshipProcessFilters(props) {
  return (
    <Filter {...props}>
      <TextInput label="Pesquisa" source="q" alwaysOn />
    </Filter>
  );
}

function InternshipProcessList(props) {
  return (
    <List {...props} title="Estágios" filters={<InternshipProcessFilters />}>
      <Datagrid>
        <TextField source="intern.name" label="Nome" />
        <TextField source="intern.registrationNumber" label="Matrícula" />
        <TextField source="company.name" label="Empresa" />
        <TextField source="status" label="Estado" />
        {/* <ShowButton label="Mostrar" />
        <EditButton label="Editar" /> */}
      </Datagrid>
    </List>
  );
}

export default InternshipProcessList;
