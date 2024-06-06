import { DaysGlucose } from '../types/days-glucose';
import { WeeklyStat } from './../types/weekly-stat';
import { StaticOfWeek } from '../types/statistic-off-the-week copy';
import { User } from '../types/user';
export interface AppStoreType {
    signIn: () => void;
    accessToken: string;

    fetchUsersData: () => void;
    fetchWatchData: () => void;
    fetchGlucose: () => void;
    fetchWeekChart: () => void;
    setSelectedUser: () => void;

    UsersList: User[];
    WeeklyStat:  WeeklyStat;
    DaysGlucose:  DaysGlucose[] ;
    WeekChartData:  any ;
    StaticOfWeek:  StaticOfWeek ;

    totalUsers: number; 
    skipUsers: number; 
    selectedUser: User;
    measurementUnit: "mg/dL" | "mmol/L"; 
    startDate: Date,
    endDate: Date,

    switchMeasurementUnit: () => void;
    setStartEndDate: () => void;

    error: null | string;
    loading: boolean;
}