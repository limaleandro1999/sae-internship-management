import React from 'react';
import { Edit, FileInput, SimpleForm, FileField } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { CustomToolbar } from '../Course/CourseCreate';

function InternMonthlyReportEdit(props) {
  const { showFileInput = true, showCommentInput = false } = props;
  return (
    <Edit {...props} actions={null}>
      <SimpleForm toolbar={<CustomToolbar />}>
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
            placeholder="Solte um arquivo para fazer upload ou clique para selecioná-lo."
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
