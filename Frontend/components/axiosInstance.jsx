// const axiosInstance = axios.create({
//     baseURL: '/api', // Use proxy for base URL
//   });
  
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );
  
//   export default axiosInstance;
  