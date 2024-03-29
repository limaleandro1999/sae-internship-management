import React from 'react';
import { List, Button, useListContext } from 'react-admin';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

function ClassesGrid(props) {
  const { ids, data } = useListContext();
  const times = [
    '07:40 - 9:40',
    '10:00 - 12:00',
    '13:40 - 14:40',
    '15:00 - 18:00',
    '18:30 - 20:09',
    '20:20 - 22:00',
  ];
  const schedule = ids.length
    ? Object.values(
        data
      ).map(
        ({
          morningAB,
          morningCD,
          afternoonAB,
          afternoonCD,
          nightAB,
          nightCD,
        }) => [morningAB, morningCD, afternoonAB, afternoonCD, nightAB, nightCD]
      )
    : [];

  /* 
    Transposing schedule matrix
    Sorry for that, I was in a hurry to finish TCC
  */
  if (schedule.length) {
    schedule.push([]);
  }
  const transposedSchedule = schedule
    .map((x, i) => schedule.map((x) => x[i]))
    .map((x) => x.slice(0, 5));

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Horário</TableCell>
          <TableCell>Segunda</TableCell>
          <TableCell>Terça</TableCell>
          <TableCell>Quarta</TableCell>
          <TableCell>Quinta</TableCell>
          <TableCell>Sexta</TableCell>
        </TableRow>
      </TableHead>
      {transposedSchedule.map((time, index) => (
        <TableBody key={index}>
          <TableRow>
            <TableCell>{times[index]}</TableCell>
            {time.map((dayTime, index) => (
              <TableCell key={index}>
                {dayTime ? <Typography>Aula</Typography> : '-'}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
}

function InternClassesScheduleList(props) {
  const history = useHistory();

  return (
    <List
      {...props}
      title="Horário das aulas"
      pagination={null}
      actions={
        <Box>
          <Button
            onClick={() => history.push('/interns/classes/1')}
            label="Editar Horário"
          >
            <Edit />
          </Button>
        </Box>
      }
    >
      <ClassesGrid />
    </List>
  );
}

export default InternClassesScheduleList;
