import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const studentApi = axios.create({
  baseURL: `${API_URL}/api/students`,
});

export const studentService = {
  // GET /api/students
  getAllStudents: async () => {
    const response = await studentApi.get('');
    return response;
  },

  // GET /api/students/{id}
  getStudentById: async (id: string) => {
    const response = await studentApi.get(`/${id}`);
    return response;
  },

  // POST /api/students
  createStudent: async (studentData: any) => {
    const response = await studentApi.post('', studentData);
    return response;
  },
};
