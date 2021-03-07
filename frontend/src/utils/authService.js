import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS } from 'react-admin';

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username: email, password } = params;
    const request = new Request('http://localhost:3000/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ access_token, type }) => {
        localStorage.setItem('token', access_token);
        localStorage.setItem('role', type);
      });
  }
  
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token');
    return Promise.resolve();
  }

  if (type === AUTH_ERROR) {
    const status  = params.status;
    if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        return Promise.reject();
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
}