import axios from "axios";

export const HOST_API = "http://localhost:1337";

export const api = axios.create({
  baseURL: `${HOST_API}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = "123";
  if (token) {
    config.headers.Authorization = `Beare ${token}`;
  }
  return config;
});

api.interceptors.response.use((response) => response, (error) =>{
    if(error.response?.status === 401){
        //logout
    }
    return Promise.reject(error)
})
