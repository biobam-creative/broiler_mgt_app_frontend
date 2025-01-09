import axios from "axios";
import config from "../config.json";
// import jwt from "jsonwebtoken";

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      alert("an unexpexted error occured. Please wait while we fixed it");
      return Promise.reject(error);
    }
    if (
      expectedError &&
      originalRequest.url === config.apiUrl + "/token/refresh/"
    ) {
      window.location.href = "/login";
      return Promise.reject(error);
    }
    if (
      error.response.status === 403 &&
      error.response.statusText === "Forbidden" &&
      originalRequest.url === config.apiUrl + "/user/login"
    ) {
      console.log("verification error");
      window.location.href = "/verification";
    }
    if (
      error.response.data.code === "ERR_BAD_REQUEST" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
        const now = Math.ceil(Date.now() / 1000);

        console.log(tokenParts.exp);
        if (tokenParts.exp > now) {
          return httpHeader
            .post(`/token/refresh/`, { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              httpHeader.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;
              return httpHeader(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login";
        }
      } else {
        console.log("Refresh token is not available");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

const httpHeader = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
    // xsrfCookieName: "csrftoken",
    // xsrfHeaderName: "X-CSRFTOKEN",
    // withCredentials: true,
  },
});

export default {
  get: axios.get,
  post: axios.post,
  header: httpHeader,
  patch: axios.patch,
  delete: axios.delete,
};
