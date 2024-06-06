import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie"; // Import a library to handle cookies

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://health-api.dev.cgmme.com',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Use an interceptor to set the token dynamically
    this.axiosInstance.interceptors.request.use(async (config) => {
      const token = await this.getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }

 // Method to get the token from local storage
private async getToken(): Promise<string | null> {
  return localStorage.getItem('accessToken') || null;
}

  async signIn(email: string, password: string) {
    const response = await this.axiosInstance.post("/auth/signin", {
      email,
      password,
    });
    return response;
  }

 async fetchUsersData(sorting: string, skip: number, search: string, diabetes: string) {
  let url = `/admin-panel/users/all?take=10&sorting=${sorting}&skip=${skip}&search=${search}`;
  if (diabetes!== 'all') {
    url += `&diabeticType=${diabetes}`;
  }
  const response = await this.axiosInstance.get(url);
  return response;
}

  async fetchWatchData(id: string, startOfRange: any, endOfRange: any) {
    const response = await this.axiosInstance.get(`/admin-panel/daily/watch-date/${id}?timeOfDay=all&startOfRange=${startOfRange}&endOfRange=${endOfRange}`);
    return response;
  }

  async fetchGlucose(id: string, startOfRange: any, endOfRange: any, measurementUnit: string
  ) {
    const response = await this.axiosInstance.get(`/admin-panel/daily/glucose/${id}?timeOfDay=all&startOfRange=${startOfRange}&endOfRange=${endOfRange}&measurement=${measurementUnit}`);
    return response;
  }

  async fetchWeekChart(id: string, startOfRange: any, endOfRange: any, measurementUnit: string
  ) {
    const response = await this.axiosInstance.get(`/admin-panel/daily/week-chart/${id}?timeOfDay=all&startOfRange=${startOfRange}&endOfRange=${endOfRange}&measurement=${measurementUnit}&days=monday&days=wednesday&days=saturday&days=sunday&days=tuesday&days=thursday&days=friday`);
    return response;
  }

}

const apiService = new ApiService();
export default apiService;

