import axios from 'axios';

const myAxios = axios.create({
  baseUrl: 'http://localhost:3636/api/',
});

export default myAxios;
