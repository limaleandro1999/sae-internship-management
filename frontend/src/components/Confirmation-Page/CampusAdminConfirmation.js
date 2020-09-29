import React from 'react';
import { useParams } from 'react-router-dom';

import { TextField } from '@material-ui/core';

function CampusAdminConfirmation() {
  let { confirmationId } = useParams();
  return (
    <div>
      <TextField label='Email'/>
      <TextField label='Password' type='password'/>
      <TextField label='Confirm Password' type='password'/>
    </div>
  );
}

export default CampusAdminConfirmation;