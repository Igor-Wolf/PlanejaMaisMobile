import axios from "axios";

export const api = axios.create({
    baseURL: 'https://planeja-mais-backend.vercel.app/api',
    headers: {
      'Content-Type': 'application/json',
    }
})