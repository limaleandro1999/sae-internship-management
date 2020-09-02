import React from 'react';
import { List, Datagrid, TextField, EditButton, ShowButton } from 'react-admin';

function CampiList(props) {
  return (
    <List {...props} title='Campi'>
      <Datagrid>
        <TextField source='name' label='Nome'/>
        <TextField source='emailAddress' label='Email'/>
        <TextField source='phone' label='Telefone'/>
        <TextField source='city' label='Cidade'/>
        <TextField source='address' label='Endereço'/>
        <EditButton/>
        <ShowButton/>
      </Datagrid>
    </List>
  );
}

export default CampiList;