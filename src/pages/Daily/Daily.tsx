import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import Card from "../../components/Card";
import TabHeader from "../../components/TabHeader";
import ContentControl from "../../components/UiElements/ContentControl";
import DatePicker from "../../components/Forms/DatePicker/DatePickerOne";
import WeeklyStat from "./WeeklyStat";
import { useAppStore } from "../../store/AppStoreProvider";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import DayLineChart from "../../components/Charts/DayLineChart";
import DatePickerRangeControled from "../../components/Forms/DatePicker/DatePickerRangeControled";


const Daily = observer(({}) => {
  const store = useAppStore();
  let selectedUser = localStorage.getItem("selectedUser");
// console.log('STATE',JSON.parse(selectedUser).username)

  useEffect(() => {
    if (store.accessToken) {
      // console.log('234STATE',)
      store.fetchGlucose();
      store.fetchWatchData();
    }
    // console.log('DaysGlucose',toJS(store.DaysGlucose))
  }, [store.accessToken, store.endDate, selectedUser, store.measurementUnit]);

  return store.loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Breadcrumb
      />
      <TabHeader />
      <Card className="rounded-tl-none ">
        <ContentControl />
        <DatePickerRangeControled/>
        <WeeklyStat stat={store.WeeklyStat} />
        <DayLineChart data={store?.DaysGlucose?.days} />
      </Card>
    </DefaultLayout>
  );
});

export default Daily;
