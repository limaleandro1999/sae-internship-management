import React from 'react';
import { Admin, Resource } from 'react-admin';
import BusinessIcon from '@material-ui/icons/Business';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SvgIcon from '@material-ui/core/SvgIcon';

import {
  CampiCreate,
  CampiList,
  CampiEdit,
  CampiShow,
} from '../../components/Campi';
import {
  CampusAdminCreate,
  CampusAdminList,
  CampusAdminEdit,
  CampusAdminShow,
} from '../../components/Campus-Admin';
import {
  InternshipSectorCreate,
  InternshipSectorList,
  InternshipSectorEdit,
  InternshipSectorShow,
} from '../../components/Internship-Sector';
import {
  CourseCreate,
  CourseEdit,
  CourseList,
  CourseShow,
} from '../../components/Course';
import {
  CompanyCreate,
  CompanyEdit,
  CompanyList,
  CompanyShow,
} from '../../components/Company';
import {
  InternshipAdvisorCreate,
  InternshipAdvisorEdit,
  InternshipAdvisorList,
  InternshipAdvisorShow,
} from '../../components/Internship-Advisor';
import {
  InternCreate,
  InternEdit,
  InternList,
  InternShow,
} from '../../components/Intern';
import {
  InternshipProcessCreate,
  InternshipProcessList,
  InternshipProcessShow,
  InternshipProcessEdit,
} from '../../components/Internship-Process';
import { CLIENT_ALLOWED_ROLES } from '../../utils/roles';
import { useHistory } from 'react-router-dom';

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

function InternshipSectorModule({ theme, dataProvider, authProvider }) {
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

  return (
    <Admin
      theme={theme}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
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
        ['Admin', 'Campus_Admin', 'Internship-Sector'].includes(permissions) ? (
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
        ['Admin', 'Campus_Admin', 'Internship-Sector'].includes(permissions) ? (
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
        ['Admin', 'Campus_Admin', 'Internship-Sector'].includes(permissions) ? (
          <Resource
            name="internship-advisors"
            list={InternshipAdvisorList}
            create={InternshipAdvisorCreate}
            edit={InternshipAdvisorEdit}
            show={InternshipAdvisorShow}
            options={{ label: 'Orientadores de Estágio' }}
          />
        ) : null,
        ['Admin', 'Campus_Admin', 'Internship-Sector'].includes(permissions) ? (
          <Resource
            name="interns"
            list={InternList}
            create={InternCreate}
            edit={InternEdit}
            show={InternShow}
            options={{ label: 'Estagiários' }}
          />
        ) : null,
        <Resource
          name="internship-processes"
          list={InternshipProcessList}
          create={InternshipProcessCreate}
          show={InternshipProcessShow}
          edit={InternshipProcessEdit}
          options={{ label: 'Processo de Estágio' }}
        />,
      ]}
    </Admin>
  );
}

export default InternshipSectorModule;
