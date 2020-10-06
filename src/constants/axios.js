const token = window.localStorage.getItem('token');

export const baseUrl = 'http://localhost:3003/';

export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
};
