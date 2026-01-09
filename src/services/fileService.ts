import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const fileApi = axios.create({
  baseURL: `${API_URL}/api/files`,
});

export const fileService = {
  // GET /api/files
  getAllFiles: async () => {
    const response = await fileApi.get('');
    return response;
  },

  // GET /api/files/{id}
  getFileById: async (id: string) => {
    const response = await fileApi.get(`/${id}`);
    return response;
  },

  // GET /api/files/state/{state}
  getFilesByState: async (state: string) => {
    const response = await fileApi.get(`/state/${state}`);
    return response;
  },

  // POST /api/files
  createFile: async (fileData: any) => {
    const response = await fileApi.post('', fileData);
    return response;
  },

  // PUT /api/files/{id}/submit
  submitFile: async (id: string) => {
    const response = await fileApi.put(`/${id}/submit`);
    return response;
  },

  // PUT /api/files/{id}/review
  reviewFile: async (id: string) => {
    const response = await fileApi.put(`/${id}/review`);
    return response;
  },

  // PUT /api/files/{id}/reject
  rejectFile: async (id: string) => {
    const response = await fileApi.put(`/${id}/reject`);
    return response;
  },

  // PUT /api/files/{id}/archive
  archiveFile: async (id: string) => {
    const response = await fileApi.put(`/${id}/archive`);
    return response;
  },

  // PUT /api/files/{id}/approve
  approveFile: async (id: string) => {
    const response = await fileApi.put(`/${id}/approve`);
    return response;
  },
};
