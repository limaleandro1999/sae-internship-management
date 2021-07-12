import React from 'react';
import { Edit, FileInput, SimpleForm, FileField } from 'react-admin';

function InternMonthlyReportEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <FileInput
          source="report-file"
          label="Relatório Mensal"
          accept="application/pdf"
        >
          <FileField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Edit>
  );
}

export default InternMonthlyReportEdit;
