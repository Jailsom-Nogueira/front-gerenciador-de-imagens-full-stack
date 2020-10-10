const token = window.localStorage.getItem('token');

export const baseUrl = 'https://my-gallery-turing.herokuapp.com/';

export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
};
