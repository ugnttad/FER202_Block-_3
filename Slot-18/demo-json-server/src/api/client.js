import axios from "axios";
const client = axios.create({
    baseURL: "http://localhost:3001", // đổi sang 3001
    headers: { "Content-Type": "application/json" },
    timeout: 8000
});
export default client;
