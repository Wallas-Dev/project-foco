import axios from 'axios';

const api = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

const consultarCEP = async (cep) => {
  try {
    const response = await api.get(`${cep}/json/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default consultarCEP;



