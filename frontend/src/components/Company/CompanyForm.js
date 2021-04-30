import React from 'react';
import {
  FormWithRedirect,
  TextInput,
  ReferenceInput,
  SelectInput,
  SaveButton,
  DeleteButton,
  required,
  email,
} from 'react-admin';
import { Typography, Box, Toolbar } from '@material-ui/core';

import { ROLES } from '../../utils/roles';

function CompanyForm(props) {
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
                  Dados da empresa
                </Typography>
                <Box display="flex">
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="name"
                      label="Nome"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="directorName"
                      label="Nome do diretor"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                </Box>
                <Box display="flex">
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="cnpj"
                      label="CNPJ"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="stateRegistration"
                      label="Inscrição Estadual"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                </Box>
                <Box display="flex">
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="address"
                      label="Endereço"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                  <Box mr="0.5em">
                    <TextInput
                      source="district"
                      label="Bairro"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                  <Box mr="0.5em">
                    <TextInput
                      source="cep"
                      label="CEP"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                  <Box mr="0.5em">
                    <TextInput
                      source="state"
                      label="Estado"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                  <Box mr="0.5em">
                    <TextInput
                      source="city"
                      label="Cidade"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom>
                  Contato
                </Typography>
                <Box display="flex">
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="email"
                      label="E-mail"
                      fullWidth={true}
                      validate={[
                        required('Campo obrigatório'),
                        email('E-mail inválido'),
                      ]}
                    />
                  </Box>
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="phone"
                      label="Telefone"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom>
                  Ramo de Atividade
                </Typography>
                <Box display="flex">
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="industry"
                      label="Ramo de Atividade"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="internshipAreaInterest"
                      label="Área de interesse de estágio"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom>
                  Dados do representante
                </Typography>
                <TextInput
                  source="representative"
                  label="Nome do representante"
                  fullWidth={true}
                  validate={required('Campo obrigatório')}
                />
                <Box display="flex">
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="office"
                      label="Cargo"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="sector"
                      label="Setor"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                  <Box flex={1} mr="0.5em">
                    <TextInput
                      source="representativePhone"
                      label="Telefone do representante"
                      fullWidth={true}
                      validate={required('Campo obrigatório')}
                    />
                  </Box>
                </Box>
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

export default CompanyForm;
