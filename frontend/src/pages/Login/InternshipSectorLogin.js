import { Box, Typography } from '@material-ui/core';
import * as React from 'react';
import { Login, LoginForm } from 'react-admin';

const InternLoginPage = ({ theme }) => {
  return (
    <Login>
      <Box display="flex" justifyContent="center">
        <Typography variant="h5">Login setor de estágio</Typography>
      </Box>
      <LoginForm />
    </Login>
  );
};

export default InternLoginPage;
