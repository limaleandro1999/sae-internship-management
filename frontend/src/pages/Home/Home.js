import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((_theme) => ({
  container: {
    padding: '40px',
    margin: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  min-width: 300px;
`;

const LinkList = styled.ul`
  list-style-type: none;
  padding-inline-start: 0;
`;

function Home() {
  const classes = useStyle();

  return (
    <Main>
      <Paper elevation={5} className={clsx(classes.container)}>
        <Typography
          variant="h3"
          style={{
            wordWrap: 'break-word',
            fontSize: 'clamp(18px, 4vw, 30px)',
            fontWeight: 'bold',
          }}
          gutterBottom
        >
          Sistema de Acompanhamento de Estágios
        </Typography>
        <Typography
          variant="body1"
          style={{ wordWrap: 'break-word', fontSize: 'clamp(15px, 2vw, 19px)' }}
          gutterBottom
        >
          Seja bem-vindo! Clique em um dos links abaixo para acessar o módulo do
          site desejado!
        </Typography>
        <div>
          <LinkList>
            <li>
              <Link to="/internship-sector/admin">
                <Typography
                  variant="body1"
                  style={{ fontSize: 'clamp(15px, 2vw, 17px)' }}
                >
                  Setor de estágio
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/internship-advisors/admin">
                <Typography
                  variant="body1"
                  style={{ fontSize: 'clamp(15px, 2vw, 17px)' }}
                >
                  Orientador de estágio
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/interns/admin">
                <Typography
                  variant="body1"
                  style={{ fontSize: 'clamp(15px, 2vw, 17px)' }}
                >
                  Estagiário
                </Typography>
              </Link>
            </li>
          </LinkList>
        </div>
      </Paper>
    </Main>
  );
}

export default Home;
