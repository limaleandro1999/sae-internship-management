import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

function CourseTitle({ record }) {
  return <span>{record ? `${record.name}` : ''}</span>;
}

function CourseShow(props) {
  return (
    <Show {...props} title={<CourseTitle />} actions={null}>
      <SimpleShowLayout>
        <TextField source="name" label="Nome" />
      </SimpleShowLayout>
    </Show>
  );
}

export default CourseShow;
