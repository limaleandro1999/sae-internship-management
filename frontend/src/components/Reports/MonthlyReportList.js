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
  Button,
} from 'react-admin';
import { GetApp } from '@material-ui/icons';
import { api } from '../../utils/api';
import fileDownload from 'js-file-download';

function DownloadGeneratedReport(props) {
  const { record } = props;
  const handleDownload = async () => {
    const content = await api.get(
      `/interns/monthly-reports/${record.id}/generate-file`,
      { responseType: 'blob' }
    );
    fileDownload(
      content.data,
      content.headers['content-disposition'].split('=')[1]
    );
  };
  return (
    <Button
      title="Download do Relatório"
      label="Download do Relatório"
      onClick={handleDownload}
    >
      <GetApp />
    </Button>
  );
}

function MonthlyReportsList(props) {
  const {
    showButtonEnabled = true,
    editButtonEnabled = true,
    downloadButtonEnabled = true,
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
        {downloadButtonEnabled ? (
          <DownloadGeneratedReport label="Download" />
        ) : null}
      </Datagrid>
    </List>
  );
}

export default MonthlyReportsList;
