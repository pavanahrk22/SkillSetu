import api from './axios';

export const getProfile = () => {
  return api.get('/competencies/profile');
};

export const selfAssess = (data) => {
  return api.post('/competencies/self-assess', data);
};

export const getGaps = () => {
  return api.get('/competencies/gaps');
};

export const getFrameworks = () => {
  return api.get('/competencies/frameworks');
};
