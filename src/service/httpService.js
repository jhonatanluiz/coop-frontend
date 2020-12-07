import axios from "axios";
import AuthService from "./authService";
import Loader from "./loaderService";
import LocalStorageService from "./localStorageService"

const api = axios.create({
    baseURL: 'http://ec2-54-94-22-216.sa-east-1.compute.amazonaws.com:8080/api'
  });
  
  api.interceptors.request.use(async config => {
    Loader.show();

    const token = AuthService.getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    response => {
      Loader.hide();
      return response;
    },
    error => {
      Loader.hide();
      if (!error.response) {
        alert('Erro na comunicacao com a API');
      } else if (
        error.response.status === 401 &&
        error.response.config.url.split('/').pop() !== 'login'
      ) {
        AuthService.logout();
        LocalStorageService.clear();
        window.location = '/login';
      } else if (error.response.status < 400 || error.response.status >= 500) {
        error.response = undefined;
        alert('Erro inesperado.');
      } else if(error.response.status == 403) {
        alert("Você não tem permissão de acessar essa pagina.");
      }else if (!error.response.data.message) {
        error.response.data.message = 'Message not defined';
      }
      return Promise.reject(error);
    }
  );

  const CoopService = {
        auth: user => {
            return api.post('/authenticate', user);
        },
        saveClient: cliente => {
            return api.post("/clientes", cliente);
        },
        editClient: cliente => {
          return api.put("/clientes", cliente);
        },
        listClient: () => {
            return api.get("/clientes");
        },
        removeClient: cliente => {
          return api.delete("/clientes/" + cliente);
        },
        getCliente: cliente => {
          return api.get("/clientes/" + cliente);
        },
        cep: nuCep => {
          console.log(nuCep)
          return api.get("/cep/" + nuCep)
        }

    }

    export default CoopService;