import React from 'react';
import {
  Edit,
  BooleanInput,
  SimpleForm,
  Toolbar,
  SaveButton,
} from 'react-admin';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

function ClassesGrid(props) {
  const times = [
    { label: '07:40 - 9:40', resource: 'morningAB' },
    { label: '10:00 - 12:00', resource: 'morningCD' },
    { label: '13:40 - 14:40', resource: 'afternoonAB' },
    { label: '15:00 - 18:00', resource: 'afternoonCD' },
    { label: '18:30 - 20:09', resource: 'nightAB' },
    { label: '20:20 - 22:00', resource: 'nightCD' },
  ];

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
      <TableBody>
        {times.map((time, index) => (
          <TableRow key={index}>
            <TableCell>{time.label}</TableCell>
            <TableCell>
              <BooleanInput source={`monday.${time.resource}`} label="" />
            </TableCell>
            <TableCell>
              <BooleanInput source={`tuesday.${time.resource}`} label="" />
            </TableCell>
            <TableCell>
              <BooleanInput source={`wednesday.${time.resource}`} label="" />
            </TableCell>
            <TableCell>
              <BooleanInput source={`thursday.${time.resource}`} label="" />
            </TableCell>
            <TableCell>
              <BooleanInput source={`friday.${time.resource}`} label="" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function InternClassesScheduleEdit(props) {
  return (
    <Edit {...props} title="Editar Horário de Aula">
      <SimpleForm
        toolbar={
          <Toolbar>
            <SaveButton redirect="list" />
          </Toolbar>
        }
      >
        <ClassesGrid />
      </SimpleForm>
    </Edit>
  );
}

export default InternClassesScheduleEdit;
