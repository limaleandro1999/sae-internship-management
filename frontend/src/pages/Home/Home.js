import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((_theme) => ({
  container: {
    padding: '40px',
  },
}));

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #086218;
  height: 100vh;
`;

const LinkList = styled.ul`
  list-style-type: none;
`;

function Home() {
  const classes = useStyle();

  return (
    <Main>
      <Paper elevation={5} className={clsx(classes.container)}>
        <Typography variant="h3" gutterBottom>
          Sistema de Gerenciamento de Estágios
        </Typography>
        <Typography variant="body1" gutterBottom>
          Seja bem-vindo! Clique em um dos links abaixo para acessar o módulo do
          site desejado!
        </Typography>
        <LinkList>
          <li>
            <Link to="/internship-sector/admin">
              <Typography variant="body1">Setor de estágio</Typography>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Typography variant="body1">Orientador de estágio</Typography>
            </Link>
          </li>
          <li>
            <Link to="/interns/admin">
              <Typography variant="body1">Estagiário</Typography>
            </Link>
          </li>
        </LinkList>
      </Paper>
    </Main>
  );
}

export default Home;
