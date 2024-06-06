import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../layout/DefaultLayout";

import PlaneLoader from "../../Loader/PlaneLoader";

const FormElements = () => {
  return (
    <DefaultLayout>
      <Breadcrumb  title="Test user " />
      <PlaneLoader inProgress={true} />
    </DefaultLayout>
  );
};

export default FormElements;
