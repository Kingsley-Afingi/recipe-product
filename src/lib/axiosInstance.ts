import axios from "axios";

const anxiosInstance = axios.create({
    baseURL:"/api",
    withCredentials:true,
})
export default anxiosInstance;