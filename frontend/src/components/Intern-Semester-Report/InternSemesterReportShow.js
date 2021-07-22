import dayjs from 'dayjs';
import React from 'react';
import { Show, SimpleShowLayout, FileField, RichTextField } from 'react-admin';

function SemesterReportTitle({ record }) {
  return (
    <span>
      {record
        ? `Período: ${dayjs(record?.startDate).format('DD/MM/YYYY')} - ${dayjs(
            record?.finishDate
          ).format('DD/MM/YYYY')}`
        : ''}
    </span>
  );
}

function InternSemesterReportShow(props) {
  return (
    <Show {...props} title={<SemesterReportTitle />} actions={null}>
      <SimpleShowLayout>
        <FileField
          source="reportFileUrl"
          title="Download do relatório"
          label="Relatório"
          accept="application/pdf"
        />
        <RichTextField
          source="advisorComment"
          title="Comentário do orientador"
          emptyText="Sem comentários"
        />
      </SimpleShowLayout>
    </Show>
  );
}

export default InternSemesterReportShow;
