import React from 'react';
import { Admin, Resource } from 'react-admin';
import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { CLIENT_ALLOWED_ROLES } from '../../utils/roles';

function TasksTable({ data = [] }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ date, status, id }) => (
            <TableRow key={id}>
              <TableCell>{date}</TableCell>
              <TableCell align="right">{status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function InternDashboard(props) {
  const reports = [
    { id: 1, date: '04/04/2020', status: 'Entregue' },
    { id: 2, date: '04/10/2020', status: 'Atraso' },
    { id: 3, date: '04/04/2021', status: 'Pendente' },
  ];

  return (
    <Box display="flex" flexDirection="column" padding="50px">
      <Box display="flex" width="100%">
        <Box
          mr="40px"
          style={{
            'box-shadow':
              '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
            padding: '50px',
          }}
        >
          <Typography variant="h4">Olá, Leandro</Typography>
          <Typography variant="subtitle1">Seu estágio:</Typography>
          <Typography variant="body1">Oowlish Technology</Typography>
          <Typography variant="body1">
            Período: 17/10/2019 - 26/06/2021
          </Typography>
          <Typography variant="body1">Estágio não-obrigatório</Typography>
        </Box>
        <Box
          style={{
            'box-shadow':
              '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
            padding: '50px',
          }}
        >
          <Typography variant="h4">Orientador</Typography>
          <Typography variant="body1">Inácio Alves</Typography>
          <Typography variant="body1">inacio.alves@ifce.edu.br</Typography>
          <Typography variant="body1">(85) 98976-3456</Typography>
        </Box>
      </Box>
      <Box display="flex">
        <Box
          mt="100px"
          mr="40px"
          width="500px"
          style={{
            'box-shadow':
              '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
            padding: '10px',
          }}
        >
          <Typography variant="h5">Seus Relatórios</Typography>
          <TasksTable data={reports} />
        </Box>
        <Box
          mt="100px"
          width="500px"
          style={{
            'box-shadow':
              '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
            padding: '10px',
          }}
        >
          <Typography variant="h5">Suas Tarefas</Typography>
          <TasksTable data={reports} />
        </Box>
      </Box>
    </Box>
  );
}

function InternModule({ theme, dataProvider, authProvider }) {
  const userRole = localStorage.getItem('role');
  const currentClient = window.location.pathname.split('/')[1];
  const history = useHistory();

  if (!CLIENT_ALLOWED_ROLES[currentClient].includes(userRole)) {
    const clientIndex = Object.values(
      CLIENT_ALLOWED_ROLES
    ).findIndex((allowedRoles) => allowedRoles.includes(userRole));
    const clientArray = Object.keys(CLIENT_ALLOWED_ROLES);
    const userClient = clientArray[clientIndex];

    history.push(`/${userClient}/admin`);
  }

  return (
    <Admin
      theme={theme}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource
        name="interns/dashboard"
        options={{ label: 'Início' }}
        list={InternDashboard}
      />
    </Admin>
  );
}

export default InternModule;
