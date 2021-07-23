import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_GET_PERMISSIONS,
} from 'react-admin';

import { environment } from './environment';
import { CLIENT_ALLOWED_ROLES } from './roles';

export default async (type, params) => {
  if (type === AUTH_LOGIN) {
    const currentClient = window.location.pathname.split('/')[1];
    const { username: email, password } = params;
    const request = new Request(`${environment.server.serverUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const response = await fetch(request);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }

    const { access_token, type } = await response.json();

    if (!CLIENT_ALLOWED_ROLES[currentClient].includes(type)) {
      throw new Error('Usuário não autorizado neste módulo');
    }

    localStorage.setItem('token', access_token);
    localStorage.setItem('role', type);

    return;
  }

  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return Promise.resolve();
  }

  if (type === AUTH_ERROR) {
    const status = params.response.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      return Promise.reject({ redirectTo: '/no-access' });
    }

    return Promise.resolve();
  }

  if (type === AUTH_CHECK) {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  }

  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem('role');
    return role ? Promise.resolve(role) : Promise.reject();
  }

  return Promise.resolve();
};
