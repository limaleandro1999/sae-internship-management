import dayjs from 'dayjs';
import React from 'react';
import {
  List,
  Datagrid,
  DateField,
  EditButton,
  ShowButton,
  FunctionField,
  TextField,
} from 'react-admin';

function MonthlyReportsList(props) {
  const {
    showButtonEnabled = true,
    editButtonEnabled = true,
    showInternNameField = false,
    showRegistrationNumberField = false,
  } = props;
  return (
    <List {...props} title="Relatórios">
      <Datagrid>
        {showInternNameField ? (
          <TextField
            source="internshipProcess.intern.name"
            label="Estagiário"
          />
        ) : null}
        {showRegistrationNumberField ? (
          <TextField
            source="internshipProcess.intern.registrationNumber"
            label="Matrícula"
          />
        ) : null}
        <FunctionField
          label="Mês de referência"
          render={(report) => dayjs(report.startDate).format('MM/YYYY')}
        />
        <DateField source="startDate" label="Início do período avaliativo" />
        <DateField source="finishDate" label="Fim do período avaliativo" />
        {showButtonEnabled ? <ShowButton label="Mostrar" /> : null}
        {editButtonEnabled ? <EditButton label="Editar" /> : null}
      </Datagrid>
    </List>
  );
}

export default MonthlyReportsList;
