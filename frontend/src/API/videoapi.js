import axios from "axios";

const api = axios.create({
    baseURL: "https://edtech-f05f.onrender.com/", 
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default api;
