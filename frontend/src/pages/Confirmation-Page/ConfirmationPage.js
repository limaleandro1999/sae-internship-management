import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ThemeProvider, Card, Box, Typography } from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CardActions,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import styled from 'styled-components';
import { Field, Form } from 'react-final-form';
import classnames from 'classnames';
import { api } from '../../utils/api';

const useStyles = makeStyles(
  (theme) => ({
    main: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      height: '1px',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      background: '#086218',
    },
    card: {
      minWidth: 300,
      marginTop: '6em',
    },
    avatar: {
      margin: '1em',
      display: 'flex',
      justifyContent: 'center',
    },
    icon: {
      backgroundColor: theme.palette.secondary[500],
    },
    form: {
      padding: '0 1em 1em 1em',
    },
    input: {
      marginTop: '1em',
    },
    button: {
      width: '100%',
    },
  }),
  { name: 'RaLogin' }
);

const ErrorMessage = styled.p`
  color: #de0b2b;
  margin: 5px;
`;

const errorsByStatusCode = {
  403: 'O email informado não foi cadastrado',
  400: 'O email já foi confirmado',
};

const Input = ({ meta: { touched, error }, input: inputProps, ...props }) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

function ConfirmationPage() {
  const { confirmationId } = useParams();
  const classes = useStyles();
  const muiTheme = createMuiTheme({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function isUserConfirmed() {
      const {
        data: { confirmed },
      } = await api.get(`/users/is-confirmed/${confirmationId}`);
      setIsConfirmed(confirmed);
    }

    isUserConfirmed();
  }, [confirmationId]);

  const validate = ({ email, password = '', passwordConfirmation = '' }) => {
    const errors = {
      email: undefined,
      password: undefined,
      passwordConfirmation: undefined,
    };

    if (!email) {
      errors.email = 'E-mail é um campo obrigatório';
    }

    if (password.length < 8 && password.length > 16) {
      errors.password = 'Senha precisa ter pelo entre 8 e 16 caracteres';
    }

    if (password !== passwordConfirmation) {
      errors.passwordConfirmation = 'As senhas são diferentes';
    }

    return errors;
  };

  const submit = async ({ email, password }) => {
    try {
      setLoading(true);
      await api.post('/users/confirm', { email, password, confirmationId });
      setIsConfirmed(true);
      setErrors([]);
      setLoading(false);
    } catch (error) {
      setErrors([errorsByStatusCode[error.response.status]]);
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={classnames(classes.main)}>
        <Card className={classes.card} style={{ width: '300px' }}>
          {isConfirmed ? (
            <>
              <Box
                mt="10px"
                padding="10px"
                display="flex"
                justifyContent="center"
              >
                <Typography variant="h5">
                  Olá! Seu cadastro já foi confirmado
                </Typography>
              </Box>
              <Box
                mt="10px"
                padding="10px"
                display="flex"
                justifyContent="center"
              >
                <Link to="/">Voltar para tela inicial</Link>
              </Box>
              <Box
                mt="10px"
                padding="10px"
                display="flex"
                justifyContent="center"
              >
                <Typography
                  style={{ wordWrap: 'break-word', textAlign: 'justify' }}
                >
                  Por favor, dirija se a página de login para logar-se ao
                  sistema!
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Box mt="10px" display="flex" justifyContent="center">
                <Typography variant="h5">Confirme sua conta</Typography>
              </Box>
              {errors.map((error, idx) => (
                <ErrorMessage key={idx}>{error}</ErrorMessage>
              ))}
              <Box
                mt="10px"
                padding="10px"
                display="flex"
                justifyContent="center"
              >
                <Typography
                  style={{ wordWrap: 'break-word', textAlign: 'justify' }}
                >
                  Por favor complete seu cadastro utilizando o email que foi
                  cadastrado e escolha uma senha para sua conta.
                </Typography>
              </Box>
              <Form
                onSubmit={submit}
                validate={validate}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.form}>
                      <div className={classes.input}>
                        <Field
                          autoFocus
                          id="email"
                          name="email"
                          component={Input}
                          label="E-mail"
                          disabled={loading}
                        />
                      </div>
                      <div className={classes.input}>
                        <Field
                          autoFocus
                          id="password"
                          name="password"
                          component={Input}
                          label="Senha"
                          type="password"
                          disabled={loading}
                        />
                      </div>
                      <div className={classes.input}>
                        <Field
                          autoFocus
                          id="passwordConfirmation"
                          name="passwordConfirmation"
                          component={Input}
                          type="password"
                          label="Confirmação de senha"
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <CardActions>
                      <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={loading}
                        className={classes.button}
                      >
                        {loading && (
                          <CircularProgress
                            className={classes.icon}
                            size={18}
                            thickness={2}
                          />
                        )}
                        Concluir
                      </Button>
                    </CardActions>
                  </form>
                )}
              />
            </>
          )}
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default ConfirmationPage;
