// import { makeAutoObservable, runInAction } from "mobx";
// import apiService from "../services/ApiService";

// class AuthStore {
//   isAuthenticated = false;
//   loading = false;
//   error: string | null = null;

//   constructor() {
//     makeAutoObservable(this);
//   }

//   signIn = async (username: string, password: string) => {
//     this.loading = true;
//     this.error = null;
//     try {
//       const response = await apiService.signIn(username, password);
//       runInAction(() => {
//         this.isAuthenticated = true;
//         this.loading = false;
//       });
//     } catch (error) {
//       runInAction(() => {
//         this.error = "Login failed";
//         this.loading = false;
//       });
//     }
//   };

//   logout = () => {
//     this.isAuthenticated = false;
//   };
// }

// const authStore = new AuthStore();
// export default authStore;
