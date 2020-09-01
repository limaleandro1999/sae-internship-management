import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

function CampiList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' label='id'/>
        <TextField source='name' label='Nome'/>
        <TextField source='emailAddress' label='Email'/>
        <TextField source='phone' label='Telefone'/>
        <TextField source='city' label='Cidade'/>
        <TextField source='address' label='Endereço'/>
      </Datagrid>
    </List>
  );
}

export default CampiList;