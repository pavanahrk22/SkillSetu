import api from './axios';

export const getCourses = (filters) => {
  return api.get('/courses', { params: filters });
};

export const getCourse = (id) => {
  return api.get(`/courses/${id}`);
};

export const getRecommendations = () => {
  return api.get('/courses/recommendations');
};

export const completeCourse = (id) => {
  return api.post(`/courses/${id}/complete`);
};
