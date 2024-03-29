import React from 'react';
import {
  FormWithRedirect,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
  SaveButton,
  required,
  email,
} from 'react-admin';
import { Typography, Box, Toolbar } from '@material-ui/core';

import { ROLES } from '../../utils/roles';

export function InternFormFields(props) {
  const userType = localStorage.getItem('role');
  const { isCreateForm = true, sourcePrefix = '' } = props;

  return (
    <Box p="1em">
      <Box display="flex">
        <Box flex={2} mr="1em">
          <Typography variant="h6" gutterBottom>
            Documentos
          </Typography>
          <TextInput
            source={`${sourcePrefix}.name`}
            label="Nome"
            fullWidth={true}
            validate={required('Campo é obrigatório')}
          />
          <Box display="flex">
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.cpf`}
                label="CPF"
                fullWidth={true}
                validate={required('Campo é obrigatório')}
              />
            </Box>
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.rg`}
                label="RG"
                fullWidth={true}
                validate={required('Campo é obrigatório')}
              />
            </Box>
            <Box flex={1} mr="0.5em">
              <DateInput
                source={`${sourcePrefix}.birthDate`}
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
                source={`${sourcePrefix}.address`}
                label="Endereço"
                fullWidth={true}
                validate={required('Campo é obrigatório')}
              />
            </Box>
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.district`}
                label="Bairro"
                fullWidth={true}
                validate={required('Campo é obrigatório')}
              />
            </Box>
          </Box>
          <Box display="flex">
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.city`}
                label="Cidade"
                fullWidth={true}
                validate={required('Campo é obrigatório')}
              />
            </Box>
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.state`}
                label="Estado"
                fullWidth={true}
                validate={required('Campo é obrigatório')}
              />
            </Box>
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.cep`}
                label="CEP"
                fullWidth={true}
                validate={required('Campo é obrigatório')}
              />
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            Contato
            {`${isCreateForm ? '/E-mail de login do Estagiário' : ''}`}
          </Typography>
          <Box display="flex">
            {isCreateForm ? (
              <Box flex={1} mr="0.5em">
                <TextInput
                  source={`${sourcePrefix}.email`}
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
                source={`${sourcePrefix}.phoneNumber`}
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
            {isCreateForm ? (
              <Box flex={1} mr="0.5em">
                <ReferenceInput
                  source={`${sourcePrefix}.course`}
                  label="Curso"
                  reference="courses"
                  validate={required('Campo é obrigatório')}
                >
                  <SelectInput optionText="name" />
                </ReferenceInput>
              </Box>
            ) : null}
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.registrationNumber`}
                label="Matrícula"
                fullWidth={true}
                validate={required('Campo é obrigatório')}
              />
            </Box>
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.coursePeriod`}
                label="Período"
                fullWidth={true}
                validate={required('Campo é obrigatório')}
              />
            </Box>
          </Box>
          <TextInput
            source={`${sourcePrefix}.responsible`}
            fullWidth={true}
            label="Responsável"
          />
          {userType === ROLES.ADMIN ? (
            <ReferenceInput
              source={`${sourcePrefix}.campus`}
              label="Campus"
              reference="campi"
            >
              <SelectInput optionText="name" />
            </ReferenceInput>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

function InternForm(props) {
  return (
    <FormWithRedirect
      {...props}
      render={(formProps) => (
        <form>
          <InternFormFields isCreateForm={props.isCreateForm} />
          <Toolbar>
            <Box display="flex" justifyContent="space-between" width="100%">
              <SaveButton
                label="Salvar"
                saving={formProps.saving}
                handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
              />
            </Box>
          </Toolbar>
        </form>
      )}
    />
  );
}

export default InternForm;
