import React, { useEffect, useState } from 'react';
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
import moment from 'moment';
import { api, getAuthHeaders } from '../../utils/api';

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

function InternshipTutorCard({ internshipProcess }) {
  return (
    <Box
      style={{
        'box-shadow':
          '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        padding: '50px',
      }}
    >
      <Typography variant="h4">Orientador</Typography>
      <Typography variant="body1">
        {internshipProcess?.internshipAdvisor?.name}
      </Typography>
      <Typography variant="body1">
        {internshipProcess?.internshipAdvisor?.user?.email}
      </Typography>
      <Typography variant="body1">
        {internshipProcess?.internshipAdvisor?.phone}
      </Typography>
    </Box>
  );
}

function InternCard({ intern }) {
  const internshipProcess = intern?.internshipProcesses[0];

  return (
    <Box
      mr="40px"
      style={{
        'box-shadow':
          '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        padding: '50px',
      }}
    >
      <Typography variant="h4">Olá, {intern?.name?.split(' ')[0]}</Typography>
      <Typography variant="subtitle1">Seu estágio:</Typography>
      <Typography variant="body1">
        {internshipProcess?.company?.name}
      </Typography>
      <Typography variant="body1">
        Período: {moment(internshipProcess?.startDate).format('DD/MM/YYYY')} -{' '}
        {moment(internshipProcess?.finishDate).format('DD/MM/YYYY')}
      </Typography>
      <Typography variant="body1">
        Estágio{' '}
        {internshipProcess?.mandatory ? 'obrigatório' : 'não-obrigatório'}
      </Typography>
    </Box>
  );
}

function InternDashboard(props) {
  const [internInfo, setInternInfo] = useState(null);

  useEffect(async () => {
    const { data } = await api.get('interns/me', { headers: getAuthHeaders() });
    setInternInfo(data);
  }, []);

  console.log(internInfo);
  const reports = [
    { id: 1, date: '04/04/2020', status: 'Entregue' },
    { id: 2, date: '04/10/2020', status: 'Atraso' },
    { id: 3, date: '04/04/2021', status: 'Pendente' },
  ];

  return (
    <Box display="flex" flexDirection="column" padding="50px">
      <Box display="flex" width="100%">
        <InternCard intern={internInfo} />
        <InternshipTutorCard
          internshipProcess={internInfo?.internshipProcesses[0]}
        />
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

export default InternDashboard;
