import React, { useEffect, useState } from 'react';
import { useQuery, Loading, Error, Button } from 'react-admin';
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
import dayjs from 'dayjs';
import dayjsBusinessDays from 'dayjs-business-days';
import { useHistory } from 'react-router-dom';

dayjs.extend(dayjsBusinessDays);

function ReportsTable({ data = [] }) {
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
              <TableCell>{dayjs(deadline).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{dayjs(startDate).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{dayjs(finishDate).format('DD/MM/YYYY')}</TableCell>
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

function TasksTable({ data = [] }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Prazo de entrega</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ date, status, id }) => (
            <TableRow key={id}>
              <TableCell>{dayjs(date).format('DD/MM/YYYY')}</TableCell>
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
        Período: {dayjs(internshipProcess?.startDate).format('DD/MM/YYYY')} -{' '}
        {dayjs(internshipProcess?.finishDate).format('DD/MM/YYYY')}
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
  const [tasks, setTasks] = useState([]);
  const history = useHistory();
  const { data, loading, error } = useQuery({
    type: 'getGeneric',
    resource: 'interns/me',
  });

  useEffect(() => {
    const semesterReports = internInfo?.internshipProcesses[0]?.semesterReports;
    const internshipTasks = internInfo?.internshipProcesses[0]?.tasks ?? [];
    const reportsArray = semesterReports
      ? semesterReports.map(
          ({ deadline, startDate, finishDate, delivered, id }) => {
            const parsedDeadline = dayjs(deadline);
            const todayDate = dayjs();
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
    const todayOrLastBussinessDay = dayjs().isBusinessDay()
      ? dayjs()
      : dayjs().prevBusinessDay();
    const tasksArray = [
      todayOrLastBussinessDay,
      todayOrLastBussinessDay.businessDaysSubtract(1),
      todayOrLastBussinessDay.businessDaysSubtract(2),
      todayOrLastBussinessDay.businessDaysSubtract(3),
    ].map((date, index) => {
      const [task] = internshipTasks.filter(
        ({ date: taskDate, delivered }) =>
          delivered && dayjs(taskDate).diff(date, 'days') === 0
      );

      if (task) {
        return {
          ...task,
          date: dayjs(task.date),
          deliveredDate: dayjs(task.deliveredDate),
          id: index,
          realId: task.id,
          status: 'Entregue',
        };
      }

      const todayDate = dayjs();
      const todayDeadlineDiff = date.diff(todayDate, 'days');

      return {
        id: index,
        delivered: false,
        date,
        status: todayDeadlineDiff > 0 ? 'Pendente' : 'Atrasado',
      };
    });

    setReports(reportsArray);
    setTasks(tasksArray);
  }, [internInfo]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) {
    return null;
  } else if (!internInfo) {
    setInternInfo(data);
  }

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
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Seus relatórios</Typography>
            <Button
              label="Ver mais"
              onClick={() => history.push('/interns/reports')}
            />
          </Box>
          <ReportsTable data={reports} />
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
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5">Suas atividades deste mês</Typography>
              <Button
                label="Ver mais"
                onClick={() => history.push('/interns/tasks')}
              />
            </Box>
            <TasksTable data={tasks} />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default InternDashboard;
