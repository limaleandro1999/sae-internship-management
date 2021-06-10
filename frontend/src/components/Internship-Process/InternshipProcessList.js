import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  FunctionField,
  Filter,
  BooleanField,
  EditButton,
  ShowButton,
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
        <BooleanField source="mandatory" label="Obrigatório" />
        <FunctionField
          label="Estado"
          render={({ status }) =>
            status === 'ACTIVE' ? 'Em andamento' : 'Finalizado'
          }
        />
        <ShowButton label="Mostrar" />
        <EditButton label="Editar" />
      </Datagrid>
    </List>
  );
}

export default InternshipProcessList;
