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
import { useHistory } from 'react-router-dom';

function TasksTable({ data = [] }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Prazo de entrega</TableCell>
            <TableCell>Início do período avaliativo</TableCell>
            <TableCell>Fim do período avaliativo</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ deadline, startDate, finishDate, status, id }) => (
            <TableRow key={id}>
              <TableCell>{moment(deadline).format('DD/MM/YYY')}</TableCell>
              <TableCell>{moment(startDate).format('DD/MM/YYY')}</TableCell>
              <TableCell>{moment(finishDate).format('DD/MM/YYY')}</TableCell>
              <TableCell
                align="right"
                style={{
                  color:
                    status === 'Entregue'
                      ? '#189108'
                      : status === 'Pendente'
                      ? '#EB8D00'
                      : '#EB0037',
                }}
              >
                {status}
              </TableCell>
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
  const [reports, setReports] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getInternData() {
      const { data, status } = await api.get('interns/me', {
        headers: getAuthHeaders(),
        validateStatus: false,
      });  

      if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return history.push('/no-access');
      }

      setInternInfo(data);
    }

    getInternData();
  }, [history]);

  useEffect(() => {
    const semesterReports = internInfo?.internshipProcesses[0]?.semesterReports;
    const reportsArray = semesterReports
      ? semesterReports.map(
          ({ deadline, startDate, finishDate, delivered, id }) => {
            const parsedDeadline = moment(deadline);
            const todayDate = moment();
            const todayDeadlineDiff = parsedDeadline.diff(todayDate, 'days');
            const status = delivered
              ? 'Entregue'
              : todayDeadlineDiff > 0
              ? 'Pendente'
              : 'Atrasado';

            return {
              deadline,
              startDate,
              finishDate,
              status,
              id,
            };
          }
        )
      : [];

    setReports(reportsArray);
  }, [internInfo]);

  return (
    <Box padding="50px">
      <Box display="flex" flexWrap="wrap">
        <InternCard intern={internInfo} />
        <InternshipTutorCard
          internshipProcess={internInfo?.internshipProcesses[0]}
        />
      </Box>
      <Box display="flex" flexWrap="wrap">
        <Box
          mt="100px"
          mr="40px"
          width="500px"
          style={{
            'box-shadow':
              '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
            padding: '20px',
          }}
        >
          <Typography variant="h5">Seus Relatórios</Typography>
          <TasksTable data={reports} />
        </Box>
        {internInfo?.internshipProcesses[0]?.mandatory ? (
          <Box
            mt="100px"
            width="500px"
            style={{
              'box-shadow':
                '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
              padding: '20px',
            }}
          >
            <Typography variant="h5">Suas Tarefas</Typography>
            <TasksTable data={reports} />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default InternDashboard;
