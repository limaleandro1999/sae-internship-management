import dayjs from 'dayjs';
import React from 'react';
import { Show, SimpleShowLayout, FileField } from 'react-admin';

function MonthlyReportTitle({ record }) {
  return (
    <span>
      {record ? `Mês: ${dayjs(record?.startDate).format('MM/YYYY')}` : ''}
    </span>
  );
}

function InternMonthlyReportShow(props) {
  return (
    <Show {...props} title={<MonthlyReportTitle />}>
      <SimpleShowLayout>
        <FileField
          source="reportFileUrl"
          title="Download do relatório"
          label="Relatório"
          accept="application/pdf"
          emptyText="Relatório não entregue"
        />
      </SimpleShowLayout>
    </Show>
  );
}

export default InternMonthlyReportShow;
