import React from 'react';
import { Admin, Resource } from 'react-admin';
import {
  InternMonthlyReportEdit,
  InternMonthlyReportShow,
} from '../../components/Intern-Monthly-Report';
import {
  InternSemesterReportEdit,
  InternSemesterReportShow,
} from '../../components/Intern-Semester-Report';
import { InternTasksShow } from '../../components/Intern-Tasks';
import { InternshipAdvisorDashboard } from '../../components/Internship-Advisor-Dashboard';
import { InternshipAdvisorInternshipProcessList } from '../../components/Internship-Advisor-Internship-Process';
import { InternshipProcessShow } from '../../components/Internship-Process';
import {
  SemesterReportsList,
  MonthlyReportsList,
} from '../../components/Reports';
import { i18nProvider } from '../../utils/i18nProvider';
import { InternshipAdvisorLoginPage } from '../Login';

function SemesterReportsListWrapper(props) {
  return (
    <SemesterReportsList
      {...props}
      showInternNameField
      showRegistrationNumberField
      downloadButtonEnabled={false}
    />
  );
}

function MonthlyReportsListWrapper(props) {
  return (
    <MonthlyReportsList
      {...props}
      showInternNameField
      showRegistrationNumberField
      downloadButtonEnabled={false}
    />
  );
}

function InternshipAdvisorModule({ theme, dataProvider, authProvider }) {
  return (
    <Admin
      theme={theme}
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      loginPage={InternshipAdvisorLoginPage}
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
        show={InternSemesterReportShow}
        edit={(props) => (
          <InternSemesterReportEdit
            {...props}
            showFileInput={false}
            showCommentInput={true}
          />
        )}
      />
      <Resource
        name="internship-advisors/monthly-reports"
        options={{ label: 'Relatórios Mensais' }}
        list={MonthlyReportsListWrapper}
        show={InternMonthlyReportShow}
        edit={(props) => (
          <InternMonthlyReportEdit
            {...props}
            showFileInput={false}
            showCommentInput={true}
          />
        )}
      />
      <Resource name="interns/tasks" show={InternTasksShow} />
    </Admin>
  );
}

export default InternshipAdvisorModule;
