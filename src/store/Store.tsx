import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import apiService from "../services/ApiService";
import { User } from "../types/user";
import { formatDateToAPIFormat, getFormattedCurrentDate, getFormattedDate } from "../hooks/formatDates";

export const createAppStore = (props) => {
  let selectedUser = localStorage.getItem("selectedUser");
  return makeAutoObservable({
    autentificated: false,
    accessToken: null,

    UsersList: [] as User[],
    WeeklyStat: null,
    DaysGlucose: [],
    WeekChartData: [],
    StaticOfWeek: {},

    selectedUser: JSON.parse(selectedUser) as unknown as User,
    totalUsers: 0,
    skipUsers: 0,
    sleepHours: null,
    calories: null,
    mood: null,
    carbs: null,
    
    measurementUnit: "mmol/L",
    startDate: getFormattedDate(),
    endDate: getFormattedCurrentDate(),

    loading: false,
    error: null,

    async fetchUsersData(
      sorting: string,
      skip: number,
      search: string,
      diabetes: string
    ) {
      this.loading = true;
      try {
        const response = await apiService.fetchUsersData(
          sorting,
          skip,
          search,
          diabetes
        );
        runInAction(() => {
          this.skipUsers = response.data.skipUsers;
          this.totalUsers = response.data.total;
          this.UsersList = response.data.items;
          this.loading = false;
        });
      } catch (error) {
        runInAction(() => {
          this.error = "Login failed";
          this.loading = false;
        });
      }
    },
    async fetchWatchData(id: any, startOfRange: string, endOfRange: string) {
      this.loading = true;
      try {
        const response = await apiService.fetchWatchData(
          id,
          startOfRange,
          endOfRange
        );
        runInAction(() => {
          this.WeeklyStat = response.data.data?.[0];
          this.loading = false;
        });
      } catch (error) {
        runInAction(() => {
          this.error = "Login failed";
          this.WeeklyStat = null;
          this.loading = false;
        });
      }
    },
    async fetchGlucose() {
      try {
        const response = await apiService.fetchGlucose(
          this.selectedUser.userId,
          formatDateToAPIFormat(this.startDate),
          formatDateToAPIFormat(this.endDate),
          this.measurementUnit
        );
        runInAction(() => {
          this.DaysGlucose = response.data?.[0];
        });
      } catch (error) {
        runInAction(() => {
          this.error = "fetchGlucose failed";
          this.DaysGlucose = [];
          // this.loading = false;
        });
      }
    },
    async fetchWeekChart() {
      try {
        const response = await apiService.fetchWeekChart(
          this.selectedUser.userId,
          formatDateToAPIFormat(this.startDate),
          formatDateToAPIFormat(this.endDate),
          this.measurementUnit,

        );
        runInAction(() => {
          console.log('response.data?.[0]',response.data?.[0]);
          this.WeekChartData = response.data?.[0];
        });
      } catch (error) {
        runInAction(() => {
          console.log('error',error);
          this.error = "fetchGlucose failed";
          this.DaysGlucose = [];
          // this.loading = false;
        });
      }
    },

    async signIn(username: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiService.signIn(username, password);
        runInAction(() => {
          this.accessToken = response.data.accessToken;
          // Write accessToken to localStorage
          if (this.accessToken) {
            localStorage.setItem("accessToken", this.accessToken);
          }
          // this.isAuthenticated = true;
          this.loading = false;
        });
      } catch (error) {
        runInAction(() => {
          this.error = "Login failed";
          this.loading = false;
        });
      }
    },
    async switchMeasurementUnit(unit: string,) {
      this.measurementUnit = unit; 
    },

    setStartEndDate(startDate: string, endDate: string) {
      this.startDate = startDate;
      this.endDate = endDate;
    },

    setSelectedUser(user: User) {
      this.selectedUser = user;
    }

    
  });
};
