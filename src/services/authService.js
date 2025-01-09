import httpServices from "./httpServices";
import config from "../config.json";

export function login(data) {
  const req = httpServices.post(`${config.apiUrl}/user/login`, data);
  return req;
}

export function signup(data) {
  return httpServices.header.post(`${config.apiUrl}/user/signup`, data);
}

export function logout() {
  localStorage.clear();
}
