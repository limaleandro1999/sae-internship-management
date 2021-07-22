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
import { ReportStatus } from '../Internship-Process/InternshipProcessShow';

export function DownloadGeneratedReport(props) {
  const { record, reportType } = props;
  const handleDownload = async () => {
    const content = await api.get(
      `/interns/${reportType}-reports/${record.id}/generate-file`,
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
    <List {...props} title="Relatórios" actions={null}>
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
        <DateField source="deliveredDate" label="Data de entrega" />
        <ReportStatus label="Estado" />
        {showButtonEnabled ? <ShowButton label="Mostrar" /> : null}
        {editButtonEnabled ? <EditButton label="Enviar Documento" /> : null}
        {downloadButtonEnabled ? (
          <DownloadGeneratedReport label="Download" reportType="monthly" />
        ) : null}
      </Datagrid>
    </List>
  );
}

export default MonthlyReportsList;
