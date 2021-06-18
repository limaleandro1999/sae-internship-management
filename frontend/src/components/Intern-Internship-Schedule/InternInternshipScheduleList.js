import React from 'react';
import { useQuery, Loading, Error } from 'react-admin';
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

function InternInternshipScheduleList(props) {
  const { data, loading, error } = useQuery({
    type: 'getGeneric',
    resource: 'interns/me',
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data?.internshipProcesses[0]) return null;

  const { internshipProcesses } = data;
  const { weeklySchedule } = internshipProcesses[0] ?? {};
  const { monday, tuesday, wednesday, thursday, friday } = weeklySchedule;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Segunda</TableCell>
          <TableCell>Terça</TableCell>
          <TableCell>Quarta</TableCell>
          <TableCell>Quinta</TableCell>
          <TableCell>Sexta</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            {monday.start} - {monday.finish}
          </TableCell>
          <TableCell>
            {tuesday.start} - {tuesday.finish}
          </TableCell>
          <TableCell>
            {wednesday.start} - {wednesday.finish}
          </TableCell>
          <TableCell>
            {thursday.start} - {thursday.finish}
          </TableCell>
          <TableCell>
            {friday.start} - {friday.finish}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default InternInternshipScheduleList;
