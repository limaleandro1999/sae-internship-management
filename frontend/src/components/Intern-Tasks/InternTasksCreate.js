import React from 'react';
import { Edit, SimpleForm, NumberInput } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import dayjs from 'dayjs';

function InternTasksCreate(props) {
  const { id: date } = props;

  return (
    <Edit
      {...props}
      title={`Atividade do dia ${dayjs(date).format('DD/MM/YYYY')}`}
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