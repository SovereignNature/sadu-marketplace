import axios, { defaultParams } from './axios';

const axiosDelete = (url, params = { ...defaultParams }) => axios.delete(url, params);

export default axiosDelete;
