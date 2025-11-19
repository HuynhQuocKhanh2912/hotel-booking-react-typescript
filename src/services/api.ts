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
      // tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MyIsIkhldEhhblN0cmluZyI6IjIyLzAxLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc2OTA0MDAwMDAwMCIsIm5iZiI6MTc0MTg4ODgwMCwiZXhwIjoxNzY5MTkxMjAwfQ.kBKKhbMMH6Pqm5TdwA9DOp9z6srHiyc9KnYL_084PPo",
      tokenCybersoft: import.meta.env.VITE_URL_TOKEN,
      Authenticator: userToken ? `Bearer ${userToken}` : "",
      token: userToken,
    },
  };
});

export default api;
