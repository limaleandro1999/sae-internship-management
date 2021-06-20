import React, { useState, useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import { useHistory } from 'react-router-dom';
import { CLIENT_ALLOWED_ROLES } from '../../utils/roles';
import { InternDashboard } from '../../components/Intern-Dashboard';
import { ReportList } from '../../components/Reports';
import {
  InternClassesScheduleList,
  InternClassesScheduleEdit,
} from '../../components/Intern-Classes-Schedule';
import { InternInternshipScheduleList } from '../../components/Intern-Internship-Schedule';
import { api, getAuthHeaders } from '../../utils/api';
import { InternTasksList } from '../../components/Intern-Tasks';

function InternModule({ theme, dataProvider, authProvider }) {
  const userRole = localStorage.getItem('role');
  const currentClient = window.location.pathname.split('/')[1];
  const history = useHistory();

  if (userRole && !CLIENT_ALLOWED_ROLES[currentClient].includes(userRole)) {
    const clientIndex = Object.values(
      CLIENT_ALLOWED_ROLES
    ).findIndex((allowedRoles) => allowedRoles.includes(userRole));
    const clientArray = Object.keys(CLIENT_ALLOWED_ROLES);
    const userClient = clientArray[clientIndex];

    history.push(`/${userClient}/admin`);
  }

  const [internInfo, setInternInfo] = useState(null);

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

  return (
    <Admin
      theme={theme}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource
        name="dashboard"
        options={{ label: 'Início' }}
        list={InternDashboard}
      />
      <Resource
        name="interns/reports"
        options={{ label: 'Relatórios' }}
        list={ReportList}
      />
      <Resource
        name="interns/tasks"
        options={{ label: 'Atividades' }}
        list={
          internInfo?.internshipProcesses[0]?.mandatory ? InternTasksList : null
        }
      />
      <Resource
        name="interns/classes"
        options={{ label: 'Horários de aula' }}
        list={InternClassesScheduleList}
        edit={InternClassesScheduleEdit}
      />
      <Resource
        name="interns/internship-schedule"
        options={{ label: 'Horários de estágio' }}
        list={InternInternshipScheduleList}
      />
    </Admin>
  );
}

export default InternModule;
