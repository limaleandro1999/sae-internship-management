import React, { useState } from 'react';
import { ThemeProvider, Card, Box, Typography } from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CardActions,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import { Field, Form } from 'react-final-form';
import classnames from 'classnames';
import { api } from '../../utils/api';
import { Link, useHistory } from 'react-router-dom';

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

const Input = ({ meta: { touched, error }, input: inputProps, ...props }) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

function ResetPassword() {
  const history = useHistory();
  const pathParameters = history?.location?.pathname?.split('/');
  const userId = pathParameters[pathParameters.length - 2];
  const token = pathParameters[pathParameters.length - 1];
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const muiTheme = createMuiTheme({});
  const [finished, setFinished] = useState(false);

  const submit = async ({ password }) => {
    setLoading(true);
    try {
      const { status } = await api.post(
        `/users/reset-password/${userId}/${token}`,
        {
          password,
        }
      );
      setFinished(status < 300 && status >= 200);
      setLoading(false);
    } catch (error) {
      alert('Não foi possivel realizar a solicitção');
      setLoading(false);
    }
  };

  const validate = ({ password = '', passwordConfirmation = '' }) => {
    const errors = { password: undefined, passwordConfirmation: undefined };

    if (password.length < 8 && password.length > 16) {
      errors.password = 'Senha precisa ter pelo entre 8 e 16 caracteres';
    }

    if (password !== passwordConfirmation) {
      errors.passwordConfirmation = 'As senhas são diferentes';
    }

    return errors;
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={classnames(classes.main)}>
        <Card className={classes.card} style={{ width: '300px' }}>
          {finished ? (
            <Box
              mt="10px"
              padding="10px"
              display="flex"
              justifyContent="center"
            >
              <Typography
                style={{ wordWrap: 'break-word', textAlign: 'justify' }}
              >
                Senha alterado com sucesso!{' '}
                <Link to="/">Voltar para tela inicial</Link>
              </Typography>
            </Box>
          ) : (
            <>
              <Box mt="10px" display="flex" justifyContent="center">
                <Typography variant="h5">Recuperar sua senha</Typography>
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
                  Digite uma nova senha para ter acesso a sua conta
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
                          label="Confirmação de Senha"
                          type="password"
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
                        Enviar
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

export default ResetPassword;
