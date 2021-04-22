import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'http://localhost:3636/api',
});

export default myAxios;
