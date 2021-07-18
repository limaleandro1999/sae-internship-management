import React from 'react';
import {
  List,
  Datagrid,
  DateField,
  useRecordContext,
  Filter,
  TextInput,
  Button,
  useListContext,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { Create, Description } from '@material-ui/icons';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { api, getAuthHeaders } from '../../utils/api';

const Alert = withReactContent(Swal);

export function TaskStatus({ label }) {
  const { delivered, date } = useRecordContext();
  const parsedDeadline = dayjs(date);
  const todayDate = dayjs();
  const todayDeadlineDiff = parsedDeadline.diff(todayDate, 'days');
  const status = delivered
    ? 'Entregue'
    : todayDeadlineDiff > 0
    ? 'Pendente'
    : 'Atrasado';
  const statusColor =
    status === 'Entregue'
      ? '#189108'
      : status === 'Pendente'
      ? '#EB8D00'
      : '#EB0037';

  return (
    <Typography label={label} style={{ color: statusColor }}>
      {status}
    </Typography>
  );
}

async function generateMontlhyReportAction(month, year, history) {
  const { status } = await api.post(
    `/reports/monthly`,
    {
      month,
      year,
    },
    { headers: getAuthHeaders() }
  );

  if (status >= 200 && status < 400) {
    await Alert.fire({
      title: 'Relatório criado com sucesso!',
      showCloseButton: true,
      confirmButtonText: 'Ok',
    });

    history.push('/interns/monthly-reports');
  }
}

function GenerateMonthlyReport(props) {
  const history = useHistory();
  const { filterValues } = useListContext();
  const date = dayjs(filterValues?.date);
  const triggerGenerateMonthlyReportModal = async () => {
    const { isConfirmed } = await Alert.fire({
      title: 'Gerar relatório mensal?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Não',
    });

    if (isConfirmed) {
      generateMontlhyReportAction(date.month() + 1, date.year(), history);
    }
  };

  return (
    <Box>
      <Button
        label="Gerar Relatório"
        title="Gerar Relatório"
        onClick={triggerGenerateMonthlyReportModal}
      >
        <Description />
      </Button>
    </Box>
  );
}

function FillTaskButton(props) {
  const { delivered, date } = useRecordContext();
  const history = useHistory();

  return (
    <Button
      title="Preencher"
      label="Preencher"
      disabled={delivered}
      onClick={() =>
        history.push(`/interns/tasks/${dayjs(date).format('YYYY-MM-DD')}`)
      }
    >
      <Create />
    </Button>
  );
}

function ShowTaskInfo(props) {
  const { delivered, realId } = useRecordContext();
  const history = useHistory();

  return (
    <Button
      title="Mostrar"
      label="Mostrar"
      disabled={!delivered}
      onClick={() => history.push(`/interns/tasks/${realId}/show`)}
    >
      <Create />
    </Button>
  );
}

function TasksFilters(props) {
  return (
    <Filter {...props}>
      <TextInput type="month" label="" source="date" alwaysOn />
    </Filter>
  );
}

function InternTasksList(props) {
  return (
    <>
      <Typography>
        Caso já tenha gerado um relatório para este mês e deseje atualizar as
        atividades do mesmo, clique novamente em "Gerar Relatório" e o relatório
        será atualizado com as novas atividades
      </Typography>
      <List
        {...props}
        title="Atividades"
        actions={<GenerateMonthlyReport />}
        filters={<TasksFilters />}
      >
        <Datagrid>
          <DateField label="Data" source="date" />
          <TaskStatus label="Estado" />
          <FillTaskButton label="Preencher" />
          <ShowTaskInfo label="Mostrar" />
        </Datagrid>
      </List>
    </>
  );
}

export default InternTasksList;
