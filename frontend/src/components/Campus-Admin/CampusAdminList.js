import React from 'react';
import { List, Datagrid, TextField, TextInput, EditButton, ShowButton, Filter, BooleanField  } from 'react-admin';

function CampiFilters(props) {
  return (
    <Filter {...props}>
      <TextInput label='Pesquisa' source='q' alwaysOn/>
    </Filter>
  );
}

function CampusAdminList(props) {
  return (
    <List {...props} title='Campus Admin' filters={<CampiFilters/>}>
      <Datagrid>
        <TextField source='firstName' label='Nome'/>
        <TextField source='lastName' label='Sobrenome'/>
        <TextField source='user.email' label='Email'/>
        <BooleanField source='user.active' label='Ativo?'/>
        <ShowButton label='Mostrar'/>
        <EditButton label='Editar'/>
      </Datagrid>
    </List>
  );
}

export default CampusAdminList;