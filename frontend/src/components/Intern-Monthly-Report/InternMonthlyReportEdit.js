import React from 'react';
import { Edit, FileInput, SimpleForm, FileField } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

function InternMonthlyReportEdit(props) {
  const { showFileInput = true, showCommentInput = false } = props;
  return (
    <Edit {...props}>
      <SimpleForm>
        <FileField
          source="reportFileUrl"
          title="Download do relatório"
          label="Relatório"
          accept="application/pdf"
          emptyText="Relatório não entregue"
        />
        {showFileInput ? (
          <FileInput
            source="report-file"
            label="Relatório Mensal"
            accept="application/pdf"
          >
            <FileField source="src" title="title" />
          </FileInput>
        ) : null}
        {showCommentInput ? (
          <RichTextInput
            source="advisorComment"
            label="Comentário do orientador"
          />
        ) : null}
      </SimpleForm>
    </Edit>
  );
}

export default InternMonthlyReportEdit;
