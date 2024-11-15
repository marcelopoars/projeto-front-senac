import axios from "axios";

export const api = axios.create({
  baseURL: "https://core.wecom.com.br/gestao/api/management",
});
