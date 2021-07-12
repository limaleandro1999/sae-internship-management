import React from 'react';
import { Show, SimpleShowLayout, FileField } from 'react-admin';

function InternMonthlyReportShow(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <FileField
          source="reportFileUrl"
          title="link"
          accept="application/pdf"
        />
      </SimpleShowLayout>
    </Show>
  );
}

export default InternMonthlyReportShow;
