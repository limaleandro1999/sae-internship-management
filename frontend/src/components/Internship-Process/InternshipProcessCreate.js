import React from 'react';
import {
  TabbedForm,
  FormTab,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  Create,
} from 'react-admin';

function InternshipProcessCreate(props) {
  return (
    <Create {...props} title="Novo Processo de Estágio">
      <TabbedForm>
        <FormTab label="Estagiário">
          <ReferenceInput
            label="Estagiário"
            source="intern"
            reference="interns"
          >
            <AutocompleteInput optionText="name" />
          </ReferenceInput>
        </FormTab>
        <FormTab label="Empresa">
          <ReferenceInput
            label="Empresa"
            source="company"
            reference="companies"
          >
            <AutocompleteInput optionText="name" />
          </ReferenceInput>
        </FormTab>
        <FormTab label="Estágio">
          <TextInput source="testt2" />
        </FormTab>
      </TabbedForm>
    </Create>
  );
}

export default InternshipProcessCreate;
