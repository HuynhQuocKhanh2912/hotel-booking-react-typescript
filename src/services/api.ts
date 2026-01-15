import axios from "axios";

const api = axios.create({
  // baseURL: "https://airbnbnew.cybersoft.edu.vn/api/",
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
});

api.interceptors.request.use((config: any) => {
  const userLocal: string | null = localStorage.getItem("user");
  const userParsed = userLocal ? JSON.parse(userLocal) : null;
  const userToken = userParsed ? userParsed.token : null;
  return {
    ...config,
    headers: {
      tokenCybersoft: import.meta.env.VITE_URL_TOKEN,
      Authenticator: userToken ? `Bearer ${userToken}` : "",
      token: userToken,
    },
  };
});

export const apiProvince = axios.create({
  baseURL: import.meta.env.VITE_URL_API_PROVINCE,
  timeout: 30000,
});

export default api;
