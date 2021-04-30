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

function InternshipAdvisorFilters(props) {
  return (
    <Filter {...props}>
      <TextInput label="Pesquisa" source="q" alwaysOn />
    </Filter>
  );
}

function InternshipAdvisorList(props) {
  return (
    <List
      {...props}
      title="Orientadores de Estágio"
      filters={<InternshipAdvisorFilters />}
    >
      <Datagrid>
        <TextField source="firstName" label="Nome" />
        <TextField source="lastName" label="Sobrenome" />
        <TextField source="phone" label="Telefone" />
        <TextField source="user.email" label="Email" />
        <BooleanField source="user.active" label="Ativo?" />
        <ShowButton label="Mostrar" />
        <EditButton label="Editar" />
      </Datagrid>
    </List>
  );
}

export default InternshipAdvisorList;
