import React from 'react';
import {
  FormWithRedirect,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
  SaveButton,
  DeleteButton,
  required,
  email,
} from 'react-admin';
import { Typography, Box, Toolbar } from '@material-ui/core';

import { ROLES } from '../../utils/roles';

function InternForm(props) {
  const userType = localStorage.getItem('role');

  return (
    <FormWithRedirect
      {...props}
      render={(formProps) => (
        <form>
          <Box p="1em">
            <Box display="flex">
              <Box flex={2} mr="1em">
                <Typography variant="h6" gutterBottom>
                  Documentos
                </Typography>
                <TextInput
                  source="name"
                  label="Nome"
                  fullWidth={true}
                  validate={required('Campo é obrigatório')}
                />
                <Box display="flex">
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="cpf"
                      label="CPF"
                      fullWidth={true}
                      validate={required('Campo é obrigatório')}
                    />
                  </Box>
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="rg"
                      label="RG"
                      fullWidth={true}
                      validate={required('Campo é obrigatório')}
                    />
                  </Box>
                  <Box flex={1} mr="0.5em">
                    <DateInput
                      source="birthDate"
                      label="Data de Nascimento"
                      fullWidth={true}
                      validate={required('Campo é obrigatório')}
                    />
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom>
                  Endereço
                </Typography>
                <Box display="flex">
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="address"
                      label="Endereço"
                      fullWidth={true}
                      validate={required('Campo é obrigatório')}
                    />
                  </Box>
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="district"
                      label="Bairro"
                      fullWidth={true}
                      validate={required('Campo é obrigatório')}
                    />
                  </Box>
                </Box>
                <Box display="flex">
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="city"
                      label="Cidade"
                      fullWidth={true}
                      validate={required('Campo é obrigatório')}
                    />
                  </Box>
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="state"
                      label="Estado"
                      fullWidth={true}
                      validate={required('Campo é obrigatório')}
                    />
                  </Box>
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="cep"
                      label="CEP"
                      fullWidth={true}
                      validate={required('Campo é obrigatório')}
                    />
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom>
                  Contato
                  {`${
                    formProps.saving ? '/E-mail de login do Estagiário' : ''
                  }`}
                </Typography>
                <Box display="flex">
                  {formProps.saving ? (
                    <Box flex={1} mr="0.5em">
                      <TextInput
                        source="email"
                        label="Email"
                        fullWidth={true}
                        validate={[
                          required('Campo é obrigatório'),
                          email('E-mail inválido'),
                        ]}
                      />
                    </Box>
                  ) : null}
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="phoneNumber"
                      label="Telefone"
                      fullWidth={true}
                      validate={required('Campo é obrigatório')}
                    />
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom>
                  Curso
                </Typography>
                <Box display="flex">
                  {formProps.saving ? (
                    <Box flex={1} mr="0.5em">
                      <ReferenceInput
                        source="course"
                        label="Curso"
                        reference="courses"
                      >
                        <SelectInput optionText="name" />
                      </ReferenceInput>
                    </Box>
                  ) : null}
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="registrationNumber"
                      label="Matrícula"
                      fullWidth={true}
                      validate={required('Campo é obrigatório')}
                    />
                  </Box>
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="coursePeriod"
                      label="Período"
                      fullWidth={true}
                      validate={required('Campo é obrigatório')}
                    />
                  </Box>
                </Box>
                <TextInput
                  source="responsible"
                  fullWidth={true}
                  label="Responsável"
                />
                {userType === ROLES.ADMIN ? (
                  <ReferenceInput
                    source="campus"
                    label="Campus"
                    reference="campi"
                  >
                    <SelectInput optionText="name" />
                  </ReferenceInput>
                ) : null}
              </Box>
            </Box>
          </Box>
          <Toolbar>
            <Box display="flex" justifyContent="space-between" width="100%">
              <SaveButton
                saving={formProps.saving}
                handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
              />
              <DeleteButton record={formProps.record} />
            </Box>
          </Toolbar>
        </form>
      )}
    />
  );
}

export default InternForm;
