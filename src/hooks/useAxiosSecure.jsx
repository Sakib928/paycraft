import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5173",
});
const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default useAxiosSecure;
