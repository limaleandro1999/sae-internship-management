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
import { Link } from 'react-router-dom';

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

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const muiTheme = createMuiTheme({});
  const [finished, setFinished] = useState(false);

  const submit = async ({ email }) => {
    setLoading(true);
    try {
      const { status } = await api.post('/users/forgot-password', {
        email,
      });
      setFinished(status < 300 && status >= 200);
      setLoading(false);
    } catch (error) {
      alert('Não foi possivel realizar a solicitção');
      setLoading(false);
    }
  };

  const validate = ({ email }) => {};

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
                Você recebeu um e-mail com as instruções para realizar a
                recuperação da sua senha.{' '}
                <Link to="/">Voltar para tela inicial</Link>
              </Typography>
            </Box>
          ) : (
            <>
              <Box mt="10px" display="flex" justifyContent="center">
                <Typography variant="h5">Esqueceu sua senha?</Typography>
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
                  Preencha o campo abaixo com seu e-mail e em alguns minutos
                  você receberá um e-mail com instruções para recuperar sua
                  senha
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

export default ForgotPassword;
