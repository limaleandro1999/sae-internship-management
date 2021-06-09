import React, { useState } from 'react';
import {
  FormWithRedirect,
  TextInput,
  ReferenceInput,
  SelectInput,
  SaveButton,
  DeleteButton,
  BooleanInput,
  DateInput,
  required,
  email,
} from 'react-admin';
import { Typography, Box, Toolbar } from '@material-ui/core';

import { ROLES } from '../../utils/roles';

export function CompanyFormFields(props) {
  const { sourcePrefix = '' } = props;
  const userType = localStorage.getItem('role');
  const [hasAgreement, setHasAgreement] = useState(false);

  return (
    <Box p="1em">
      <Box display="flex" flexWrap="wrap">
        <Box flex={2} mr="1em">
          <Typography variant="h6" gutterBottom>
            Dados da empresa
          </Typography>
          <Box display="flex" flexWrap="wrap">
            <TextInput
              source={`${sourcePrefix}.name`}
              label="Nome"
              fullWidth={true}
              validate={required('Campo obrigatório')}
            />
          </Box>
          <Box display="flex" flexWrap="wrap">
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.cnpj`}
                label="CNPJ"
                fullWidth={true}
                validate={required('Campo obrigatório')}
              />
            </Box>
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.stateRegistration`}
                label="Inscrição Estadual"
                fullWidth={true}
                validate={required('Campo obrigatório')}
              />
            </Box>
          </Box>
          <Box display="flex" flexWrap="wrap">
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.address`}
                label="Endereço"
                fullWidth={true}
                validate={required('Campo obrigatório')}
              />
            </Box>
            <Box mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.complement`}
                label="Complemento"
              />
            </Box>
            <Box mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.district`}
                label="Bairro"
                fullWidth={true}
                validate={required('Campo obrigatório')}
              />
            </Box>
          </Box>
          <Box display="flex" flexWrap="wrap">
            <Box mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.cep`}
                label="CEP"
                fullWidth={true}
                validate={required('Campo obrigatório')}
              />
            </Box>
            <Box mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.state`}
                label="Estado"
                fullWidth={true}
                validate={required('Campo obrigatório')}
              />
            </Box>
            <Box mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.city`}
                label="Cidade"
                fullWidth={true}
                validate={required('Campo obrigatório')}
              />
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            Contato
          </Typography>
          <Box display="flex" flexWrap="wrap">
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.email`}
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
                source={`${sourcePrefix}.phone`}
                label="Telefone"
                fullWidth={true}
                validate={required('Campo obrigatório')}
              />
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            Ramo de Atividade
          </Typography>
          <Box display="flex" flexWrap="wrap">
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.industry`}
                label="Ramo de Atividade"
                fullWidth={true}
                validate={required('Campo obrigatório')}
              />
            </Box>
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.internshipAreaInterest`}
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
            source={`${sourcePrefix}.representative`}
            label="Nome do representante"
            fullWidth={true}
            validate={required('Campo obrigatório')}
          />
          <Box display="flex" flexWrap="wrap">
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.office`}
                label="Cargo"
                fullWidth={true}
                validate={required('Campo obrigatório')}
              />
            </Box>
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.sector`}
                label="Setor"
                fullWidth={true}
                validate={required('Campo obrigatório')}
              />
            </Box>
            <Box flex={1} mr="0.5em">
              <TextInput
                source={`${sourcePrefix}.representativePhone`}
                label="Telefone do representante"
                fullWidth={true}
                validate={required('Campo obrigatório')}
              />
            </Box>
          </Box>
          <Typography variant="h6" gutterBottom>
            Convênio
          </Typography>
          <BooleanInput
            source={`${sourcePrefix}.institutionAgreement`}
            label="Convênio?"
            fullWidth={true}
            onChange={(value) => setHasAgreement(value)}
          />
          {hasAgreement ? (
            <Box display="flex" flexWrap="wrap">
              <Box>
                <DateInput
                  label="Data de início"
                  source={`${sourcePrefix}.institutionAgreementStartDate`}
                />
              </Box>
              <Box ml="0.5em">
                <DateInput
                  label="Data de término"
                  source={`${sourcePrefix}.institutionAgreementFinishDate`}
                />
              </Box>
            </Box>
          ) : null}
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

function CompanyForm(props) {
  return (
    <FormWithRedirect
      {...props}
      render={(formProps) => (
        <form>
          <CompanyFormFields />
          <Toolbar>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="space-between"
              width="100%"
            >
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
