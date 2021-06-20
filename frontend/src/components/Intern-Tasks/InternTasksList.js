import React from 'react';
import {
  List,
  Datagrid,
  DateField,
  useRecordContext,
  Filter,
  TextInput,
} from 'react-admin';
import { Typography } from '@material-ui/core';
import moment from 'moment';

export function TaskStatus(props) {
  const { delivered, date } = useRecordContext();
  const parsedDeadline = moment(date);
  const todayDate = moment();
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

  return <Typography style={{ color: statusColor }}>{status}</Typography>;
}

function TasksFilters(props) {
  return (
    <Filter {...props}>
      <TextInput type="month" label="Data" source="date" alwaysOn />
    </Filter>
  );
}

function InternTasksList(props) {
  return (
    <List {...props} title="Atividades" filters={<TasksFilters />}>
      <Datagrid>
        <DateField label="Data" source="date" />
        <TaskStatus />
      </Datagrid>
    </List>
  );
}

export default InternTasksList;
