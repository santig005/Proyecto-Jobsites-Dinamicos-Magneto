import axios from "axios";

const API = 'http://localhost:5000/api';
export const registerRequest = user => axios.post(`${API}/register`, user);
//no estoy seguro pero aqui quedé
export const loginRequest = user => axios.post(`${API}/login`, user)