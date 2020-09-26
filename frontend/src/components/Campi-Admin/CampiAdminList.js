import React from 'react';
import { List, Datagrid, TextField, TextInput, EditButton, ShowButton, Filter } from 'react-admin';

function CampiFilters(props) {
  return (
    <Filter {...props}>
      <TextInput label='Pesquisa' source='q' alwaysOn/>
    </Filter>
  );
}

function CampiAdminList(props) {
  return (
    <List {...props} title='Campus Admin' filters={<CampiFilters/>}>
      <Datagrid>
        <TextField source='name' label='Nome'/>
        <TextField source='email' label='Email'/>
        <EditButton/>
        <ShowButton/>
      </Datagrid>
    </List>
  );
}

export default CampiAdminList;