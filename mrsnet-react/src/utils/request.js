import axios from "axios";

// Configure server baseURL (配置服务器路径)
export const baseURL = "http://localhost:3333/";

const request = axios.create({
  baseURL,
});

request.interceptors.response.use((response) => {
  if (response.data) {
    const { code, data } = response.data;
    if (code === 200) {
      return data;
    } else {
      return Promise.reject(response.data.error);
    }
  }
  return Promise.reject("Process failed!");
});

export default request;
