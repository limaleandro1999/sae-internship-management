import React from 'react';
import { List, useListContext } from 'react-admin';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';

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
              <TableCell key={index}>{dayTime ? <Check /> : <Close />}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
}

function InternClassesScheduleList(props) {
  return (
    <List {...props} title="Horário das aulas">
      <ClassesGrid />
    </List>
  );
}

export default InternClassesScheduleList;
