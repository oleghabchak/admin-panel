import axios from "axios"

const API_URL = "https://api.themageapp.com/server/"

const axiosInterceptorInstance = axios.create({
  baseURL: API_URL,
})

axiosInterceptorInstance.interceptors.request.use(
 
)

axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInterceptorInstance
