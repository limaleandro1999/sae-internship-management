import React from 'react';
import { Edit, SimpleForm, NumberInput } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import moment from 'moment';

function InternTasksCreate(props) {
  const { id: date } = props;

  return (
    <Edit
      {...props}
      title={`Atividade do dia ${moment(date).format('DD/MM/YYYY')}`}
    >
      <SimpleForm>
        <RichTextInput source="activity" label="Descrição da atividade" />
        <RichTextInput source="observation" label="Observação" />
        <NumberInput source="workedHoursAmount" label="Horas trabalhadas" />
      </SimpleForm>
    </Edit>
  );
}

export default InternTasksCreate;
