import { Box, Typography } from '@material-ui/core';
import * as React from 'react';
import { Login, LoginForm } from 'react-admin';

const InternLoginPage = ({ theme }) => {
  return (
    <Login>
      <Box display="flex" justifyContent="center" mr="20px" ml="20px">
        <Typography variant="h5">Login do professor orientador</Typography>
      </Box>
      <LoginForm />
    </Login>
  );
};

export default InternLoginPage;
