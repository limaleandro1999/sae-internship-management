import React, { useState, useEffect } from 'react';
import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  BooleanField,
  DateField,
  ReferenceField,
  ArrayField,
  Datagrid,
  useRecordContext,
  useDataProvider,
  Loading,
  Button,
  SimpleForm,
  TextInput,
  FileField,
} from 'react-admin';
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

function InternshipProcessTitle({ record }) {
  return (
    <span>
      {record ? `${record.intern?.name} - ${record.company?.name}` : ''}
    </span>
  );
}

function TaskStatus({ date, delivered }) {
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

  return <Typography style={{ color: statusColor }}>{status}</Typography>;
}

function ShowTaskInfo({ realId, delivered }) {
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

function ShowReportButton(props) {
  const { reportType } = props;
  const { id } = useRecordContext();
  const history = useHistory();

  return (
    <Button
      title="Mostrar"
      label="Mostrar"
      onClick={() => history.push(`/reports/${reportType}-reports/${id}/show`)}
    >
      <Create />
    </Button>
  );
}

function DailySchedule(props) {
  const { label, day } = props;

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <Box display="flex" width="100%" mb="1em">
        <Box>
          <TextField source={`weeklySchedule.${day}.start`} label="Início" />
        </Box>
        <Box ml="0.5em">
          <TextField source={`weeklySchedule.${day}.finish`} label="Término" />
        </Box>
      </Box>
    </>
  );
}

export function ReportStatus(props) {
  const { delivered, deadline } = useRecordContext();
  const parsedDeadline = dayjs(deadline);
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

  return <Typography style={{ color: statusColor }}>{status}</Typography>;
}

function SemesterReportsTab(props) {
  const { semesterReports } = useRecordContext();

  return semesterReports?.length ? (
    <ArrayField source="semesterReports" label="Relatórios Semestrais">
      <Datagrid>
        <DateField source="deadline" label="Prazo de entrega" />
        <DateField source="startDate" label="Início do período avaliativo" />
        <DateField source="finishDate" label="Fim do período avaliativo" />
        <DateField source="deliveredDate" label="Data de entrega" />
        <ReportStatus />
        <ShowReportButton reportType="semester" />
      </Datagrid>
    </ArrayField>
  ) : (
    <Typography variant="h6">
      Não há relatórios semestrais para esse estagiário
    </Typography>
  );
}

function MonthlyReportsTab(props) {
  const { mandatory, monthlyReports } = useRecordContext();

  return mandatory && monthlyReports?.length ? (
    <ArrayField source="monthlyReports" label="Relatórios Mensais">
      <Datagrid>
        <DateField source="deadline" label="Prazo de entrega" />
        <DateField source="startDate" label="Início do período avaliativo" />
        <DateField source="finishDate" label="Fim do período avaliativo" />
        <DateField source="deliveredDate" label="Data de entrega" />
        <ReportStatus />
        <ShowReportButton reportType="monthly" />
      </Datagrid>
    </ArrayField>
  ) : (
    <Typography variant="h6">
      Não há relatórios semestrais para esse estagiário
    </Typography>
  );
}

function TasksTab(props) {
  const { id, mandatory } = useRecordContext();
  const dataProvider = useDataProvider();
  const [tasks, setTasks] = useState([]);
  const [filterDate, setFilterDate] = useState(dayjs().format('YYYY-MM'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    dataProvider
      .getList(`internship-advisors/internship-processes/${id}/tasks`, {
        pagination: { page: 1, perPage: 31 },
        filter: { date: filterDate },
        sort: { field: 'id', order: 'ASC' },
      })
      .then(({ data }) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [filterDate, dataProvider, id]);

  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;

  return mandatory ? (
    <>
      <SimpleForm toolbar={null}>
        <TextInput
          type="month"
          label=""
          source="date"
          alwaysOn
          onChange={(event) => setFilterDate(event?.target?.value)}
        />
      </SimpleForm>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Situação</TableCell>
            <TableCell>Mostrar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map(({ date, delivered, realId }, index) => (
            <TableRow key={index}>
              <TableCell>{dayjs(date).format('DD/MM/YYYY')}</TableCell>
              <TableCell>
                <TaskStatus date={date} delivered={delivered} />
              </TableCell>
              <TableCell>
                <ShowTaskInfo realId={realId} delivered={delivered} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  ) : (
    <Typography variant="h6">Não há atividades para esse estagiário</Typography>
  );
}

function InternshipProcessShow(props) {
  return (
    <Show {...props} title={<InternshipProcessTitle />}>
      <TabbedShowLayout>
        <Tab label="Estágio">
          <Typography variant="h6" gutterBottom>
            Estagiário
          </Typography>
          <ReferenceField label="Nome" source="intern.id" reference="interns">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="intern.registrationNumber" label="Matrícula" />

          <Typography variant="h6" gutterBottom>
            Empresa
          </Typography>
          <ReferenceField
            label="Empresa"
            source="company.id"
            reference="companies"
          >
            <TextField source="name" />
          </ReferenceField>
          <TextField source="company.cnpj" label="CNPJ" />
          <TextField source="supervisor" label="Supervisor" />
          <TextField source="supervisorPosition" label="Cargo do Supervisor" />

          <Typography variant="h6" gutterBottom>
            Contrato
          </Typography>
          <ReferenceField
            label="Professor Orientador"
            source="internshipAdvisor.id"
            reference="internship-advisors"
          >
            <TextField source="name" />
          </ReferenceField>
          <TextField source="dailyWorkload" label="Carga Horária Diária" />
          <TextField source="weeklyWorkload" label="Carga Horária Diária" />
          <DateField source="startDate" label="Data de início" />
          <DateField source="finishDate" label="Data de término" />

          <Typography variant="h6" gutterBottom>
            Bolsa
          </Typography>
          <TextField source="salaryAmount" label="Valor da bolsa" />
          <TextField source="policyNumber" label="Número da apólice" />
          <TextField source="insuranceCompany" label="Empresa Seguradora" />

          <BooleanField source="mandatory" label="Obrigatório" />

          <FileField
            source="registrationFormFileURL"
            title="Download do documento"
            label="Ficha de Matrícula"
            accept="application/pdf"
            emptyText="Documento não enviado"
          />
          <FileField
            source="internshipCommitmentTermAndActivityPlanFileURL"
            title="Download do documento"
            label="Termo de compromisso de estágio e plano de atividades"
            accept="application/pdf"
            emptyText="Documento não enviado"
          />
          <FileField
            source="internEvaluationSheetFileURL"
            title="Download do documento"
            label="Ficha de avaliação do estagiário"
            accept="application/pdf"
            emptyText="Documento não enviado"
          />
          <FileField
            source="finalInternshipReportFileURL"
            title="Download do documento"
            label="Relatório final de estágio"
            accept="application/pdf"
            emptyText="Documento não enviado"
          />
          <FileField
            source="applicationCompletionInternshipFileURL"
            title="Download do documento"
            label="Requerimento conclusão estágio"
            accept="application/pdf"
            emptyText="Documento não enviado"
          />
          <FileField
            source="internshipCompletionStatementFileURL"
            title="Download do documento"
            label="Declaração de conclusão de estágio"
            accept="application/pdf"
            emptyText="Documento não enviado"
          />
          <FileField
            source="internshipAgreementTerminationTermFileURL"
            title="Download do documento"
            label="Termo de rescisão de contrato de estágio "
            accept="application/pdf"
            emptyText="Documento não enviado"
          />
          <FileField
            source="applicationCompletionInternshipFileURL"
            title="Download do documento"
            label="Requerimento conclusão estágio"
            accept="application/pdf"
            emptyText="Documento não enviado"
          />
          <FileField
            source="guidanceForFinalInternshipReportFileURL"
            title="Download do documento"
            label="Orientação para relatório final de estágio"
            accept="application/pdf"
            emptyText="Documento não enviado"
          />
        </Tab>
        <Tab label="Horário">
          <DailySchedule label="Segunda" day="monday" />
          <DailySchedule label="Terça" day="tuesday" />
          <DailySchedule label="Quarta" day="wednesday" />
          <DailySchedule label="Quinta" day="thursday" />
          <DailySchedule label="Sexta" day="friday" />
        </Tab>
        <Tab label="Relatórios Semestrais">
          <SemesterReportsTab />
        </Tab>
        <Tab label="Relatórios Mensais">
          <MonthlyReportsTab />
        </Tab>
        <Tab label="Tarefas">
          <TasksTab {...props} />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
}

export default InternshipProcessShow;
