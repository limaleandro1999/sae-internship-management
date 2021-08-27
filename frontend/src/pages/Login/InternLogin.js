import { Box, Typography, Link } from '@material-ui/core';
import * as React from 'react';
import { Login, LoginForm } from 'react-admin';

const InternLoginPage = ({ theme, customHistory }) => {
  return (
    <Login>
      <Box display="flex" justifyContent="center">
        <Typography variant="h5">Login do estagiário</Typography>
      </Box>
      <Box mt="10px" padding="10px" display="flex" justifyContent="center">
        <Link component="button" onClick={() => customHistory.push('/')}>
          Voltar para tela inicial
        </Link>
      </Box>
      <LoginForm />
      <Box mt="10px" padding="10px" display="flex" justifyContent="center">
        <Link
          component="button"
          onClick={() => customHistory.push('/forgot-password')}
        >
          Esqueci minha senha
        </Link>
      </Box>
    </Login>
  );
};

export default InternLoginPage;
