import { stringify } from 'query-string';
import axios from 'axios';

import { environment } from './environment';

export const api = axios.create({
  baseURL: environment.server.serverUrl,
});

export default {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const { data } = await api.get(`/${resource}?${stringify(query)}`, {
      headers: { ...getAuthHeaders() },
    });

    return { data: data[0], total: data[1] };
  },
  getOne: (resource, params) =>
    api.get(`/${resource}/${params.id}`, { headers: { ...getAuthHeaders() } }),
  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const { data } = await api.get(`/${resource}?${stringify(query)}`, {
      headers: { ...getAuthHeaders() },
    });

    return { data: data[0] };
  },
  getGeneric: (resource, params) =>
    api.get(`/${resource}`, { headers: { ...getAuthHeaders() } }),

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const { data } = await api.get(`/${resource}?${stringify(query)}`, {
      headers: { ...getAuthHeaders() },
    });

    return { data: data[0], total: data[1] };
  },
  update: (resource, params) => {
    const formData = new FormData();
    const { data } = params;

    switch (resource) {
      case 'interns/monthly-reports':
      case 'interns/semester-reports':
        formData.append('report-file', params.data['report-file'].rawFile);

        return api.put(`/${resource}/${params.id}`, formData, {
          headers: { ...getAuthHeaders() },
        });

      case 'internship-processes/time-additive':
        for (let key in data) {
          formData.append(
            key,
            data[key]?.rawFile ? data[key]?.rawFile : data[key]
          );
        }

        return api.put(`/${resource}/${params.id}`, formData, {
          headers: { ...getAuthHeaders() },
        });

      case 'internship-processes/finish':
        for (let key in data) {
          if (data[key]?.rawFile) {
            formData.append(key, data[key]?.rawFile);
          }
        }

        return api.put(`/${resource}/${params.id}`, formData, {
          headers: { ...getAuthHeaders() },
        });

      default:
        return api.put(`/${resource}/${params.id}`, params.data, {
          headers: { ...getAuthHeaders() },
        });
    }
  },
  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };

    return api.put(`/${resource}?${stringify(query)}`, params.data, {
      headers: { ...getAuthHeaders() },
    });
  },
  create: (resource, params) => {
    if (resource === 'internship-processes') {
      const formData = new FormData();
      const { data } = params;

      for (let key in data) {
        if (data[key].rawFile) {
          formData.append(key, data[key]?.rawFile);
        } else {
          if (key === 'intern' || key === 'company') {
            formData.append(
              key,
              typeof data[key] !== 'number'
                ? JSON.stringify(data[key])
                : data[key]
            );
          } else {
            formData.append(
              key,
              key === 'weeklySchedule' ? JSON.stringify(data[key]) : data[key]
            );
          }
        }
      }

      return api.post(`/${resource}`, formData, {
        headers: { ...getAuthHeaders() },
      });
    }
    return api.post(`/${resource}`, params.data, {
      headers: { ...getAuthHeaders() },
    });
  },
  delete: (resource, params) =>
    api.delete(`/${resource}/${params.id}`, {
      headers: { ...getAuthHeaders() },
    }),
  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };

    return api.delete(`/${resource}?${stringify(query)}`, {
      data: params,
      headers: { ...getAuthHeaders() },
    });
  },
};

export function getAuthHeaders() {
  return {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
}
