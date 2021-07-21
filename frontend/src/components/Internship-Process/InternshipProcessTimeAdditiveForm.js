import React from 'react';
import {
  DateField,
  DateInput,
  Edit,
  SimpleForm,
  TextField,
  FileInput,
  FileField,
  BooleanField,
} from 'react-admin';

const redirect = (basePath, id, data) =>
  `/internship-processes/${data.id}/show`;

function InternshipProcessTimeAdditiveForm(props) {
  return (
    <Edit {...props} title="Aditivar tempo">
      <SimpleForm redirect={redirect}>
        <TextField source="intern.name" label="Nome" />
        <TextField source="intern.registrationNumber" label="Matrícula" />
        <TextField source="company.name" label="Empresa" />
        <BooleanField source="mandatory" label="Obrigatório" />
        <DateField source="startDate" label="Data de início" />
        <DateField source="finishDate" label="Data de término original" />
        <DateInput source="finishDate" label="Nova data de término" />
        <FileInput
          source="timeAdditiveTerm"
          label="Termo aditivo de tempo"
          accept="application/pdf"
          placeholder="Solte um arquivo para fazer upload ou clique para selecioná-lo."
        >
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Edit>
  );
}

export default InternshipProcessTimeAdditiveForm;
