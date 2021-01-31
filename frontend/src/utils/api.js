import { stringify } from 'query-string';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
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
    const { data } = await api.get(`/${resource}?${stringify(query)}`);

    return { data: data[0], total: data[1] };
  },
  getOne: (resource, params) => api.get(`/${resource}/${params.id}`),
  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    
    return api.get(`/${resource}?${stringify(query)}`);
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
    const { data } = await api.get(`/${resource}?${stringify(query)}`);

    return { data: data[0], total: data[1] };
  },
  update: (resource, params) => api.put(`/${resource}/${params.id}`, params.data),
  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids}),
    };
    
    return api.put(`/${resource}?${stringify(query)}`, params.data);
  },
  create: (resource, params) => api.post(`/${resource}`, params.data),
  delete: (resource, params) => api.delete(`/${resource}/${params.id}`),
  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids}),
    };

    return api.delete(`/${resource}?${stringify(query)}`, { data: params });
  },
};