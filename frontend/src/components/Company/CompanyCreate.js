import React from 'react';
import { Create, SimpleForm, TextInput, SelectInput, ReferenceInput, required } from 'react-admin';
import { Typography } from '@material-ui/core';

import { ROLES } from '../../utils/roles';

function CompanyCreate(props) {
  const userType = localStorage.getItem('role');

  return (
    <Create {...props} title='Nova Empresa'>
      <SimpleForm>
        <Typography variant="h6" gutterBottom>Dados da empresa</Typography>
        <TextInput source='name' label='Nome' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='directorName' label='Nome do diretor' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='cnpj' label='CNPJ' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='stateRegistration' label='Inscrição Estadual' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='address' label='Endereço' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='district' label='Bairro' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='cep' label='CEP' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='state' label='Estado' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='city' label='Cidade' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='email' label='E-mail' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='phone' label='Telefone' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='industry' label='Ramo de Atividade' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='internshipAreaInterest' label='Área de interesse de estágio' fullWidth={true} validate={required('Campo obrigatório')}/>
        
        <Typography variant="h6" gutterBottom>Dados do representante</Typography>
        <TextInput source='representative' label='Nome do representante' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='office' label='Cargo' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='sector' label='Setor' fullWidth={true} validate={required('Campo obrigatório')}/>
        <TextInput source='representativePhone' label='Telefone do representante' fullWidth={true} validate={required('Campo obrigatório')}/>
        {
          userType === ROLES.ADMIN ?
            <ReferenceInput source='campus' label='Campus' reference='campi'>
              <SelectInput optionText='name' />
            </ReferenceInput>
          : null
        }
      </SimpleForm>
    </Create>
  );
}

export default CompanyCreate;