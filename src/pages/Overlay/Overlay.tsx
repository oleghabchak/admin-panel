import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import Card from "../../components/Card";
import TabHeader from "../../components/TabHeader";
import ContentControl from "../../components/UiElements/ContentControl";
import DatePicker from "../../components/Forms/DatePicker/DatePickerOne";
import { useAppStore } from "../../store/AppStoreProvider";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import PlaneLoader from "../../components/Loader/PlaneLoader";
import WeekLineChart from "../../components/Charts/WeekLineChart";
import AverageGlucose from "./AverageGlucose";
import DatePickerRangeControled from "../../components/Forms/DatePicker/DatePickerRangeControled";

const Overlay = observer(({}) => {
  const store = useAppStore();

  useEffect(() => {
    store.fetchWeekChart();
    console.log('STATE',11111111)
    console.log('store.WeekChartData',toJS(store.WeekChartData))
  // }, [store.accessToken, store.endDate, store.measurementUnit]);
  }, [store.accessToken, store.endDate, store.measurementUnit]);

  return store.loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Breadcrumb/>
      <TabHeader/>
      <Card className="rounded-tl-none ">
        <ContentControl />
        <DatePickerRangeControled/>
        <AverageGlucose/>
        <WeekLineChart data={store.WeekChartData}/>
        {/* <PlaneLoader inProgress={true} /> */}
      </Card>
    </DefaultLayout>
  );
});

export default Overlay;
