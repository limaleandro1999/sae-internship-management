import React from 'react';
import { Admin, Resource, defaultTheme } from 'react-admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { merge } from 'lodash';
import SvgIcon from '@material-ui/core/SvgIcon';

import BusinessIcon from '@material-ui/icons/Business';
import MenuBookIcon from '@material-ui/icons/MenuBook';

import {
  CampiCreate,
  CampiList,
  CampiEdit,
  CampiShow,
} from './components/Campi';
import {
  CampusAdminCreate,
  CampusAdminList,
  CampusAdminEdit,
  CampusAdminShow,
} from './components/Campus-Admin';
import {
  InternshipSectorCreate,
  InternshipSectorList,
  InternshipSectorEdit,
  InternshipSectorShow,
} from './components/Internship-Sector';
import {
  CourseCreate,
  CourseEdit,
  CourseList,
  CourseShow,
} from './components/Course';
import {
  CompanyCreate,
  CompanyEdit,
  CompanyList,
  CompanyShow,
} from './components/Company';
import {
  InternshipAdvisorCreate,
  InternshipAdvisorEdit,
  InternshipAdvisorList,
  InternshipAdvisorShow,
} from './components/Internship-Advisor';
import {
  InternCreate,
  InternEdit,
  InternList,
  InternShow,
} from './components/Intern';

import CampusAdminConfirmation from './components/Confirmation-Page/CampusAdminConfirmation';

import api from './utils/api';
import authProvider from './utils/authService';

function AdminIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill="currentColor"
        d="M12,15C7.58,15 4,16.79 4,19V21H20V19C20,16.79 16.42,15 12,15M8,9A4,4 0 0,0 12,13A4,4 0 0,0 16,9M11.5,2C11.2,2 11,2.21 11,2.5V5.5H10V3C10,3 7.75,3.86 7.75,6.75C7.75,6.75 7,6.89 7,8H17C16.95,6.89 16.25,6.75 16.25,6.75C16.25,3.86 14,3 14,3V5.5H13V2.5C13,2.21 12.81,2 12.5,2H11.5Z"
      />
    </SvgIcon>
  );
}

function App() {
  const theme = merge({}, defaultTheme, {
    palette: {
      secondary: {
        dark: '#086218',
        light: '#086218',
        main: '#086218',
      },
    },
  });

  document.title = getPageTitle();

  return (
    <Router>
      <Switch>
        <Route path="/account-confirmation/:confirmationId">
          <CampusAdminConfirmation />
        </Route>
      </Switch>
      <Route path="/admin">
        <Admin theme={theme} dataProvider={api} authProvider={authProvider}>
          {(permissions) => [
            ['Admin'].includes(permissions) ? (
              <Resource
                name="campi"
                list={CampiList}
                create={CampiCreate}
                edit={CampiEdit}
                show={CampiShow}
                options={{ label: 'Campi' }}
              />
            ) : null,
            ['Admin', 'Campus_Admin'].includes(permissions) ? (
              <Resource
                name="campus-admin"
                icon={AdminIcon}
                list={CampusAdminList}
                create={CampusAdminCreate}
                edit={CampusAdminEdit}
                show={CampusAdminShow}
                options={{ label: 'Adm. de Campus' }}
              />
            ) : null,
            ['Admin', 'Campus_Admin'].includes(permissions) ? (
              <Resource
                name="internship-sector"
                list={InternshipSectorList}
                create={InternshipSectorCreate}
                edit={InternshipSectorEdit}
                show={InternshipSectorShow}
                options={{ label: 'Setor de Estágio' }}
              />
            ) : null,
            ['Admin', 'Campus_Admin', 'Internship-Sector'].includes(
              permissions
            ) ? (
              <Resource
                name="courses"
                icon={MenuBookIcon}
                list={CourseList}
                create={CourseCreate}
                edit={CourseEdit}
                show={CourseShow}
                options={{ label: 'Cursos' }}
              />
            ) : null,
            ['Admin', 'Campus_Admin', 'Internship-Sector'].includes(
              permissions
            ) ? (
              <Resource
                name="companies"
                icon={BusinessIcon}
                list={CompanyList}
                create={CompanyCreate}
                edit={CompanyEdit}
                show={CompanyShow}
                options={{ label: 'Empresas' }}
              />
            ) : null,
            ['Admin', 'Campus_Admin', 'Internship-Sector'].includes(
              permissions
            ) ? (
              <Resource
                name="internship-advisors"
                list={InternshipAdvisorList}
                create={InternshipAdvisorCreate}
                edit={InternshipAdvisorEdit}
                show={InternshipAdvisorShow}
                options={{ label: 'Orientadores de Estágio' }}
              />
            ) : null,
            ['Admin', 'Campus_Admin', 'Internship-Sector'].includes(
              permissions
            ) ? (
              <Resource
                name="interns"
                list={InternList}
                create={InternCreate}
                edit={InternEdit}
                show={InternShow}
                options={{ label: 'Estagiários' }}
              />
            ) : null,
          ]}
        </Admin>
      </Route>
    </Router>
  );
}

function getPageTitle() {
  if (window.location.pathname.includes('/admin')) {
    return 'Painel Administrativo';
  }

  if (window.location.pathname.includes('/account-confirmation')) {
    return 'Confirme sua conta!';
  }

  return '';
}

export default App;
