import React from 'react';
import {
  List,
  Datagrid,
  DateField,
  EditButton,
  ShowButton,
} from 'react-admin';
import { ReportStatus } from '../Internship-Process/InternshipProcessShow';

function ReportsList(props) {
  return (
    <List {...props} title="Relatórios">
      <Datagrid>
        <DateField source="deadline" label="Prazo de entrega" />
        <DateField
          source="startDate"
          label="Início do período avaliativo"
        />
        <DateField
          source="finishDate"
          label="Fim do período avaliativo"
        />
        <ReportStatus />
        <ShowButton label="Mostrar" />
        <EditButton label="Editar" />
      </Datagrid>
    </List>
  );
}

export default ReportsList;