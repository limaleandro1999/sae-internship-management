import React from 'react';
import { Edit } from 'react-admin';

import InternForm from './InternForm';

function InternTitle({ record }) {
  return <span>{record ? `${record.name}` : ''}</span>;
}

function InternEdit(props) {
  return (
    <Edit {...props} title={<InternTitle />} actions={null}>
      <InternForm isCreateForm={false} />
    </Edit>
  );
}

export default InternEdit;
