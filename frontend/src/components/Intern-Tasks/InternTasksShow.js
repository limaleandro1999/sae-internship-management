import React from 'react';
import {
  Show,
  NumberField,
  RichTextField,
  SimpleShowLayout,
  DateField,
} from 'react-admin';
import moment from 'moment';

function InternTasksShow(props) {
  const { id: date } = props;

  return (
    <Show
      {...props}
      title={`Atividade do dia ${moment(date).format('DD/MM/YYYY')}`}
      actions={null}
    >
      <SimpleShowLayout>
        <DateField source="deliveredDate" label="Entregue em" />
        <RichTextField source="activity" label="Descrição da atividade" />
        <RichTextField source="observation" label="Observação" />
        <NumberField source="workedHoursAmount" label="Horas trabalhadas" />
      </SimpleShowLayout>
    </Show>
  );
}

export default InternTasksShow;
