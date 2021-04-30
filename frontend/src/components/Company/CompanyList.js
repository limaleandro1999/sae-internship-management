import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  EditButton,
  ShowButton,
  Filter,
} from 'react-admin';

function CompanyFilters(props) {
  return (
    <Filter {...props}>
      <TextInput label="Pesquisa" source="q" alwaysOn />
    </Filter>
  );
}

function CompanyList(props) {
  return (
    <List {...props} title="Empresa" filters={<CompanyFilters />}>
      <Datagrid>
        <TextField source="name" label="Nome" />
        <TextField source="cnpj" label="CNPJ" />
        <TextField source="email" label="E-mail" />
        <TextField source="phone" label="Telefone" />
        <ShowButton label="Mostrar" />
        <EditButton label="Editar" />
      </Datagrid>
    </List>
  );
}

export default CompanyList;
