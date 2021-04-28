import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://burger-builder-8e1dc-default-rtdb.firebaseio.com/',
});

export default axiosInstance;
