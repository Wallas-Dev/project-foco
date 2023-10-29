import axios from 'axios';

const api = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

const consultarCEP = async (cep) => {
  try {
    const response = await api.get(`${cep}/json/`);
    return response.data;
  } catch (error) {
    //console.error('Erro ao consultar CEP:', error);
    throw error; // Você pode lançar o erro para que seja tratado onde a função foi chamada.
  }
};

export default consultarCEP;



