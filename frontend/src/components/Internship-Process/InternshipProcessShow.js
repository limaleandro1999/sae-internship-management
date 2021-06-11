import React from 'react';
import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  BooleanField,
  DateField,
  ReferenceField,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';

function InternshipProcessTitle({ record }) {
  return (
    <span>
      {record ? `${record.intern?.name} - ${record.company?.name}` : ''}
    </span>
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
        </Tab>
        <Tab label="Horário">
          <DailySchedule label="Segunda" day="monday" />
          <DailySchedule label="Terça" day="tuesday" />
          <DailySchedule label="Quarta" day="wednesday" />
          <DailySchedule label="Quinta" day="thursday" />
          <DailySchedule label="Sexta" day="friday" />
        </Tab>
        <Tab label="Relatórios"></Tab>
        <Tab label="Tarefas"></Tab>
      </TabbedShowLayout>
    </Show>
  );
}

export default InternshipProcessShow;
