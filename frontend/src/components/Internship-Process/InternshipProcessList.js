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
  useRefresh,
} from 'react-admin';
import { Done } from '@material-ui/icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { api, getAuthHeaders } from '../../utils/api';

const Alert = withReactContent(Swal);

function InternshipProcessFilters(props) {
  return (
    <Filter {...props}>
      <TextInput label="Pesquisa" source="q" alwaysOn />
    </Filter>
  );
}

function FinishInternshipProcessButton(props) {
  const { record } = props;
  const refresh = useRefresh();
  const triggerFinishInternshipModal = async () => {
    const { isConfirmed } = await Alert.fire({
      title: 'Finalizar estágio?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Não',
    });

    if (isConfirmed) {
      finishInternshipAction(record, refresh);
    }
  };

  return (
    <Button
      title="Finalizar"
      label="Finalizar"
      onClick={triggerFinishInternshipModal}
    >
      <Done />
    </Button>
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
        <FinishInternshipProcessButton />
        <ShowButton label="Mostrar" />
        <EditButton label="Editar" />
      </Datagrid>
    </List>
  );
}

async function finishInternshipAction(internshipProcess, refreshPage) {
  const { data } = await api.post(
    `/internship-processes/${internshipProcess?.id}/finish`,
    {},
    { headers: getAuthHeaders() }
  );

  if (data?.status === 'FINISHED') {
    await Alert.fire({
      title: 'Estágio finalizado com sucesso!',
      showCloseButton: true,
      confirmButtonText: 'Ok',
    });

    refreshPage();
  }
}

export default InternshipProcessList;
