import React from 'react';
import { Admin, Resource } from 'react-admin';
import InternTasksShow from '../../components/Intern-Tasks/InternTasksShow';
import { InternshipAdvisorDashboard } from '../../components/Internship-Advisor-Dashboard';
import { InternshipAdvisorInternshipProcessList } from '../../components/Internship-Advisor-Internship-Process';
import { InternshipProcessShow } from '../../components/Internship-Process';
import {
  SemesterReportsList,
  MonthlyReportsList,
} from '../../components/Reports';

function SemesterReportsListWrapper(props) {
  return (
    <SemesterReportsList
      {...props}
      showInternNameField
      showRegistrationNumberField
    />
  );
}

function MonthlyReportsListWrapper(props) {
  return (
    <MonthlyReportsList
      {...props}
      showInternNameField
      showRegistrationNumberField
    />
  );
}

function InternshipAdvisorModule({ theme, dataProvider, authProvider }) {
  return (
    <Admin
      theme={theme}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource
        name="dashboard"
        options={{ label: 'Início' }}
        list={InternshipAdvisorDashboard}
      />
      <Resource
        name="internship-advisors/internship-processes"
        options={{ label: 'Estagiários' }}
        list={InternshipAdvisorInternshipProcessList}
        show={InternshipProcessShow}
      />
      <Resource
        name="internship-advisors/semester-reports"
        options={{ label: 'Relatórios Semestrais' }}
        list={SemesterReportsListWrapper}
      />
      <Resource
        name="internship-advisors/monthly-reports"
        options={{ label: 'Relatórios Mensais' }}
        list={MonthlyReportsListWrapper}
      />
      <Resource name="interns/tasks" show={InternTasksShow} />
    </Admin>
  );
}

export default InternshipAdvisorModule;
