import React, { useState } from 'react';
import {
  TabbedForm,
  FormTab,
  TextInput,
  NumberInput,
  DateInput,
  BooleanInput,
  ReferenceInput,
  AutocompleteInput,
  Button,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { InternFormFields } from '../Intern/InternForm';
import { CompanyFormFields } from '../Company/CompanyForm';

function InternTabForm(props) {
  const [showCreateIntern, setShowCreateIntern] = useState(false);

  return !showCreateIntern ? (
    <Box display="flex" alignItems="center" width="80%">
      <ReferenceInput
        label="Estagiário"
        source="intern"
        reference="interns"
        perPage={5}
        fullWidth={true}
      >
        <AutocompleteInput
          optionText={(intern) =>
            `${intern.name} - ${intern.registrationNumber}`
          }
          optionValue="id"
        />
      </ReferenceInput>
      <Box mb="1em" ml="3em">
        <Button
          color="primary"
          size="small"
          variant="contained"
          onClick={() => setShowCreateIntern(!showCreateIntern)}
        >
          <Typography variant="button" gutterBottom>
            Novo
          </Typography>
        </Button>
      </Box>
    </Box>
  ) : (
    <Box p="1em" width="100%">
      <Button
        color="primary"
        size="small"
        variant="contained"
        onClick={() => setShowCreateIntern(!showCreateIntern)}
      >
        <Typography variant="button" gutterBottom>
          Pesquisar
        </Typography>
      </Button>
      <InternFormFields sourcePrefix="intern" isCreateForm={true} />
    </Box>
  );
}

function CompanyTabFrom() {
  const [showCreateCompany, setShowCreateCompany] = useState(false);

  return !showCreateCompany ? (
    <Box display="flex" alignItems="center" width="80%">
      <ReferenceInput
        label="Empresa"
        source="company"
        reference="companies"
        perPage={5}
        fullWidth={true}
      >
        <AutocompleteInput
          optionText={(company) => `${company.name} - ${company.cnpj}`}
          optionValue="id"
        />
      </ReferenceInput>
      <Box mb="1em" ml="3em">
        <Button
          color="primary"
          size="small"
          variant="contained"
          onClick={() => setShowCreateCompany(!showCreateCompany)}
        >
          <Typography variant="button" gutterBottom>
            Novo
          </Typography>
        </Button>
      </Box>
    </Box>
  ) : (
    <Box p="1em" width="100%">
      <Button
        color="primary"
        size="small"
        variant="contained"
        onClick={() => setShowCreateCompany(!showCreateCompany)}
      >
        <Typography variant="button" gutterBottom>
          Pesquisar
        </Typography>
      </Button>
      <CompanyFormFields sourcePrefix="company" isCreateForm={true} />
    </Box>
  );
}

function ContractTabForm(props) {
  const { isCreateForm = false } = props;

  return (
    <Box p="1em" width="100%">
      {isCreateForm ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            Professor Orientador
          </Typography>
          <ReferenceInput
            label="Professor Orientador"
            source="internshipAdvisor"
            reference="internship-advisors"
            perPage={10}
            fullWidth={true}
          >
            <AutocompleteInput optionText="name" optionValue="id" />
          </ReferenceInput>
        </Box>
      ) : null}

      <Box display="flex">
        <Box flex={2} mr="1em">
          <Typography variant="h6" gutterBottom>
            Período de Estágio
          </Typography>
          <Box display="flex" flexWrap="wrap">
            <Box mr="0.5em">
              <DateInput label="Data de início" source="startDate" />
            </Box>
            <Box mr="0.5em">
              <DateInput label="Data de término" source="finishDate" />
            </Box>
          </Box>

          <Box display="flex" flexWrap="wrap">
            <Box mr="0.5em">
              <NumberInput
                label="Carga Horária Diária"
                source="dailyWorkload"
              />
            </Box>
            <Box mr="0.5em">
              <NumberInput
                label="Carga Horária Semanal"
                source="weeklyWorkload"
              />
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            Horários do Estágio
          </Typography>
          <Box display="flex" flexWrap="wrap">
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Segunda-feira
              </Typography>
              <Box display="flex">
                <Box flex={1} mr="0.5em">
                  <TextInput
                    label="Entrada"
                    source="weeklySchedule.monday.start"
                  />
                </Box>
                <Box flex={1} mr="0.5em">
                  <TextInput
                    label="Saída"
                    source="weeklySchedule.monday.finish"
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Terça-feira
              </Typography>
              <Box display="flex">
                <Box flex={1} mr="0.5em">
                  <TextInput
                    label="Entrada"
                    source="weeklySchedule.tuesday.start"
                  />
                </Box>
                <Box flex={1} mr="0.5em">
                  <TextInput
                    label="Saída"
                    source="weeklySchedule.tuesday.finish"
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Quarta-feira
              </Typography>
              <Box display="flex">
                <Box flex={1} mr="0.5em">
                  <TextInput
                    label="Entrada"
                    source="weeklySchedule.wednesday.start"
                  />
                </Box>
                <Box flex={1} mr="0.5em">
                  <TextInput
                    label="Saída"
                    source="weeklySchedule.wednesday.finish"
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Quinta-feira
              </Typography>
              <Box display="flex">
                <Box flex={1} mr="0.5em">
                  <TextInput
                    label="Entrada"
                    source="weeklySchedule.thursday.start"
                  />
                </Box>
                <Box flex={1} mr="0.5em">
                  <TextInput
                    label="Saída"
                    source="weeklySchedule.thursday.finish"
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Sexta-feira
              </Typography>
              <Box display="flex">
                <Box flex={1} mr="0.5em">
                  <TextInput
                    label="Entrada"
                    source="weeklySchedule.friday.start"
                  />
                </Box>
                <Box flex={1} mr="0.5em">
                  <TextInput
                    label="Saída"
                    source="weeklySchedule.friday.finish"
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            Bolsa de Estágio
          </Typography>
          <Box display="flex" flexWrap="wrap">
            <Box mr="0.5em">
              <NumberInput label="Valor da Bolsa" source="salaryAmount" />
            </Box>
            <Box mr="0.5em">
              <TextInput label="Nº da apólice" source="policyNumber" />
            </Box>
            <Box mr="0.5em">
              <TextInput label="Empresa Seguradora" source="insuranceCompany" />
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            Supervisor
          </Typography>
          <Box display="flex" flexWrap="wrap">
            <Box flex={1} mr="0.5em">
              <TextInput
                label="Supervisor"
                source="supervisor"
                fullWidth={true}
              />
            </Box>
            <Box flex={1} mr="0.5em">
              <TextInput
                label="Cargo do supervisor"
                source="supervisorPosition"
              />
            </Box>
          </Box>
          <BooleanInput
            source="mandatory"
            label="Estágio Obrigatório?"
            fullWidth={true}
          />
        </Box>
      </Box>
    </Box>
  );
}

function InternshipProcessForm(props) {
  const { isCreateForm = false } = props;

  return (
    /**
     * Yeah, I don't like it either, but it worked
     */
    <TabbedForm {...props}>
      {[
        <FormTab label="Estagiário">
          <InternTabForm />
        </FormTab>,
        <FormTab label="Empresa">
          <CompanyTabFrom />
        </FormTab>,
        <FormTab label="Contrato">
          <ContractTabForm isCreateForm={isCreateForm} />
        </FormTab>,
      ].filter((item, index) =>
        !(!isCreateForm && index !== 2) ? item : null
      )}
    </TabbedForm>
  );
}

export default InternshipProcessForm;
