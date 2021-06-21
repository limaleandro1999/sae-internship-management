import React from 'react';
import {
  List,
  Datagrid,
  DateField,
  useRecordContext,
  Filter,
  TextInput,
  Button,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { Create, Description } from '@material-ui/icons';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

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

function GenerateMonthlyReport(props) {
  return (
    <Box>
      <Button label="Gerar Relatório" title="Gerar Relatório">
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
  );
}

export default InternTasksList;
