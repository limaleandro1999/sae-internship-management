import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  EditButton,
  ShowButton,
  Filter,
  BooleanField,
} from 'react-admin';
import { ListActions } from '../Campi/CampiList';

function InternFilters(props) {
  return (
    <Filter {...props}>
      <TextInput label="Pesquisa" source="q" alwaysOn />
    </Filter>
  );
}

function InternList(props) {
  return (
    <List
      {...props}
      title="Estagiários"
      filters={<InternFilters />}
      actions={<ListActions />}
    >
      <Datagrid>
        <TextField source="name" label="Nome" />
        <TextField source="registrationNumber" label="Matrícula" />
        <TextField source="phoneNumber" label="Telefone" />
        <TextField source="user.email" label="Email" />
        <TextField source="course.name" label="Curso" />
        <BooleanField source="user.active" label="Ativo?" />
        <ShowButton label="Mostrar" />
        <EditButton label="Editar" />
      </Datagrid>
    </List>
  );
}

export default InternList;
