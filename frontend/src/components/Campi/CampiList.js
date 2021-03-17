import React from 'react';
import { List, Datagrid, TextField, TextInput, EditButton, ShowButton, Filter } from 'react-admin';

function CampiFilters(props) {
  return (
    <Filter {...props}>
      <TextInput label='Pesquisa' source='q' alwaysOn/>
    </Filter>
  );
}

function CampiList(props) {
  return (
    <List {...props} title='Campi' filters={<CampiFilters/>}>
      <Datagrid>
        <TextField source='name' label='Nome'/>
        <TextField source='emailAddress' label='Email'/>
        <TextField source='phone' label='Telefone'/>
        <TextField source='city' label='Cidade'/>
        <TextField source='address' label='Endereço'/>
                <ShowButton label='Mostrar'/>
        <EditButton label='Editar'/>
      </Datagrid>
    </List>
  );
}

export default CampiList;