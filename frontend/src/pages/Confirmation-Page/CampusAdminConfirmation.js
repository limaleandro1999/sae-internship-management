import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import { TextField, Button } from '@material-ui/core';

import { api } from '../../utils/api';

const useStyle = makeStyles((theme) => ({
  textField: {
    width: '400px',
    margin: '10px',
  },
  button: {
    margin: '10px',
  },
}));

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #f4f4f4;
  height: 100vh;
`;

const MainTitle = styled.h1`
  margin: 30px;
`;

const Description = styled.h3`
  margin: 30px;
  width: 400px;
  text-align: justify;
`;

const ErrorMessage = styled.p`
  color: #de0b2b;
  margin: 5px;
`;

const errorsByStatusCode = {
  403: 'O email informado não foi cadastrado',
};

function CampusAdminConfirmation() {
  const { confirmationId } = useParams();
  const classes = useStyle();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [user, setUser] = useState({ email: '', password: '', confirmationId });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function isUserConfirmed() {
      const {
        data: { confirmed },
      } = await api.get(`/users/is-confirmed/${confirmationId}`);
      setIsConfirmed(confirmed);
    }

    isUserConfirmed();
  }, [confirmationId]);

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post('/users/confirm', user);
      setIsConfirmed(true);
      setErrors([]);
    } catch (error) {
      setErrors([errorsByStatusCode[error.response.status]]);
    }
  };

  return (
    <div>
      {isConfirmed ? (
        <Main>
          <MainTitle>Olá! Seu cadastro já foi confirmado</MainTitle>
          <Description>
            Por favor, dirija se a página de login para logar-se ao sistema!
          </Description>
        </Main>
      ) : (
        <Main>
          <MainTitle>Olá! Seja bem-vindo!</MainTitle>
          <Description>
            Por favor complete seu cadastro utilizando o email que foi
            cadastrado e escolha uma senha para sua conta.
          </Description>
          {errors.map((error, idx) => (
            <ErrorMessage key={idx}>{error}</ErrorMessage>
          ))}
          <TextField
            className={clsx(classes.textField)}
            label="Email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          <TextField
            className={clsx(classes.textField)}
            label="Senha"
            name="password"
            type="password"
            value={user.password}
            onChange={handleInputChange}
          />
          <Button
            color="primary"
            className={clsx(classes.button)}
            onClick={handleSubmit}
          >
            Concluir
          </Button>
        </Main>
      )}
    </div>
  );
}

export default CampusAdminConfirmation;
