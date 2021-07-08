import React from 'react';
import {
  List,
  Datagrid,
  DateField,
  TextField,
  EditButton,
  ShowButton,
} from 'react-admin';
import { ReportStatus } from '../Internship-Process/InternshipProcessShow';

function SemesterReportsList(props) {
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
        <DateField source="deadline" label="Prazo de entrega" />
        <DateField source="startDate" label="Início do período avaliativo" />
        <DateField source="finishDate" label="Fim do período avaliativo" />
        <ReportStatus label="Estado" />
        {showButtonEnabled ? <ShowButton label="Mostrar" /> : null}
        {editButtonEnabled ? <EditButton label="Editar" /> : null}
      </Datagrid>
    </List>
  );
}

export default SemesterReportsList;
