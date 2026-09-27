import api from './axios';

export const getHeatmap = () => {
  return api.get('/admin/heatmap');
};

export const getEffectiveness = () => {
  return api.get('/admin/effectiveness');
};

export const getUsers = () => {
  return api.get('/admin/users');
};

export const getAnalytics = () => {
  return api.get('/admin/analytics');
};
