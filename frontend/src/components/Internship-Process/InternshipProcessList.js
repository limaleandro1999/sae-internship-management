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
  Button,
} from 'react-admin';
import { Done, Alarm } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { ListActions } from '../Campi/CampiList';

function InternshipProcessFilters(props) {
  return (
    <Filter {...props}>
      <TextInput label="Pesquisa" source="q" alwaysOn />
    </Filter>
  );
}

function FinishInternshipProcessButton(props) {
  const { record } = props;
  const history = useHistory();

  return (
    <Button
      title="Finalizar"
      label="Finalizar"
      onClick={() => history.push(`/internship-processes/finish/${record.id}`)}
    >
      <Done />
    </Button>
  );
}

function AddHoursButton(props) {
  const { record } = props;
  const history = useHistory();

  return (
    <Button
      title="Adicionar Horas"
      label="Adicionar Horas"
      onClick={() =>
        history.push(`/internship-processes/time-additive/${record.id}`)
      }
    >
      <Alarm />
    </Button>
  );
}

function InternshipProcessList(props) {
  return (
    <List
      {...props}
      title="Estágios"
      filters={<InternshipProcessFilters />}
      actions={<ListActions />}
    >
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
        <AddHoursButton label="Adicionar Horas" />
        <FinishInternshipProcessButton label="Finalizar" />
        <ShowButton label="Mostrar" />
        <EditButton label="Editar" />
      </Datagrid>
    </List>
  );
}

export default InternshipProcessList;
