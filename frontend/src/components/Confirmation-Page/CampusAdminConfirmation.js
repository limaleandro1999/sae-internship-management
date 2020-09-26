import React from 'react';
import { useParams } from 'react-router-dom';

function CampusAdminConfirmation() {
  let { confirmationId } = useParams();
  return (
    <h1>
      {confirmationId}
    </h1>
  );
}

export default CampusAdminConfirmation;