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
const AGP = observer(({}) => {
  const store = useAppStore();

  useEffect(() => {
    store.fetchGlucose();
  }, [store.accessToken, ]);

  return store.loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Breadcrumb />
      <TabHeader/>
      <Card className="rounded-tl-none ">
        <ContentControl />
        <DatePicker />
        <PlaneLoader inProgress={true} />
      </Card>
    </DefaultLayout>
  );
});

export default AGP;
