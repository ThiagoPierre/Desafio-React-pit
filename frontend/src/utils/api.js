import axios from 'axios';

// Cria a rota base de requisições

const myAxios = axios.create({
  baseURL: 'http://localhost:3636/api',
});

export default myAxios;
