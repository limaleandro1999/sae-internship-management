import React from 'react';
import {
  Edit,
  SimpleForm,
  FileInput,
  FileField,
  TextField,
  BooleanField,
} from 'react-admin';

const redirect = (basePath, id, data) =>
  `/internship-processes/${data.id}/show`;

function InternshipProcessFinishEdit(props) {
  return (
    <Edit {...props} title="Finalizar Estágio">
      <SimpleForm redirect={redirect}>
        <TextField source="intern.name" label="Nome" />
        <TextField source="intern.registrationNumber" label="Matrícula" />
        <TextField source="company.name" label="Empresa" />
        <BooleanField source="mandatory" label="Obrigatório" />
        <FileInput
          source="internEvaluationSheet"
          label="Ficha de avaliação do estagiário"
          accept="application/pdf"
          placeholder="Solte um arquivo para fazer upload ou clique para selecioná-lo."
        >
          <FileField source="src" title="title" />
        </FileInput>
        <FileInput
          source="finalInternshipReport"
          label="Relatório final de estágio"
          accept="application/pdf"
          placeholder="Solte um arquivo para fazer upload ou clique para selecioná-lo."
        >
          <FileField source="src" title="title" />
        </FileInput>
        <FileInput
          source="applicationCompletionInternship"
          label="Requerimento conclusão estágio"
          accept="application/pdf"
          placeholder="Solte um arquivo para fazer upload ou clique para selecioná-lo."
        >
          <FileField source="src" title="title" />
        </FileInput>
        <FileInput
          source="internshipCompletionStatement"
          label="Declaração de conclusão de estágio"
          accept="application/pdf"
          placeholder="Solte um arquivo para fazer upload ou clique para selecioná-lo."
        >
          <FileField source="src" title="title" />
        </FileInput>
        <FileInput
          source="internshipAgreementTerminationTerm"
          label="Termo de rescisão de contrato de estágio "
          accept="application/pdf"
          placeholder="Solte um arquivo para fazer upload ou clique para selecioná-lo."
        >
          <FileField source="src" title="title" />
        </FileInput>
        <FileInput
          source="applicationCompletionInternship"
          label="Requerimento conclusão estágio"
          accept="application/pdf"
          placeholder="Solte um arquivo para fazer upload ou clique para selecioná-lo."
        >
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Edit>
  );
}

export default InternshipProcessFinishEdit;
