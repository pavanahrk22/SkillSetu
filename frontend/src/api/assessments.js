import api from './axios';

export const generateAssessment = (formData) => {
  return api.post('/assessments/generate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getAssessments = () => {
  return api.get('/assessments');
};

export const getAssessment = (id) => {
  return api.get(`/assessments/${id}`);
};

export const submitAssessment = (id, answers) => {
  return api.post(`/assessments/${id}/submit`, { answers });
};

export const getResults = () => {
  return api.get('/assessments/results');
};
