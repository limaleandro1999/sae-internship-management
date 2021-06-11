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
  update: (resource, params) =>
    api.put(`/${resource}/${params.id}`, params.data, {
      headers: { ...getAuthHeaders() },
    }),
  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };

    return api.put(`/${resource}?${stringify(query)}`, params.data, {
      headers: { ...getAuthHeaders() },
    });
  },
  create: (resource, params) =>
    api.post(`/${resource}`, params.data, { headers: { ...getAuthHeaders() } }),
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
