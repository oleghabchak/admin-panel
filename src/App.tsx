import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import PageTitle from "./components/PageTitle";
import SignIn from "./components/UiElements/Authentication/SignIn";
import SignUp from "./components/UiElements/Authentication/SignUp";
import Calendar from "./components/UiElements/Calendar";
import Chart from "./components/UiElements/Chart";
import ECommerce from "./components/UiElements/Dashboard/ECommerce";
import FormElements from "./components/UiElements/Form/FormElements";
import FormLayout from "./components/UiElements/Form/FormLayout";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Overview from "./pages/Overview/AppUsers";
import AppUsers from "./pages/Overview/AppUsers";
import Alerts from "./components/UiElements/Alerts";
import Buttons from "./components/UiElements/Button";
import TableOne from "./components/Tables/TableOne";
import TableTwo from "./components/Tables/TableTwo";
import TableThree from "./components/Tables/TableThree";
import Card from "./components/Card";
import Daily from "./pages/Daily/Daily";
import { useAppStore } from "./store/AppStoreProvider"; // index.jsx
import PlaneLoader from "./components/Loader/PlaneLoader";
import Overlay from "./pages/Overlay/Overlay";
import Trends from "./pages/Trends/Trends";
import AGP from "./pages/AGP/AGP";
import Report from "./pages/Report/Report";
import Statistics from "./pages/Statistics/Statistics";

interface AppStoreType {
  accessToken: any; // Replace 'any' with a more specific type if possible
  test: any; // Replace 'any' with a more specific type if possible
  toggleTest: () => void;
  setAccessToken: () => void;
  // Add other properties and methods as needed
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const store = useAppStore();

  useEffect(() => {
    store.signIn("coachtest", "pass1234")
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return false ? (
    <PlaneLoader inProgress={true} />
  ) : (
    <>
      <Routes>
        {/* <Route
          index
          element={
            <>
              <PageTitle title="CGMMe Admin Panel" />
              <AppUsers />
            </>
          }
        /> */}
        <Route path="/">
          <Route
            index
            element={
              <>
                <PageTitle title="Overview | CGMMe Admin" />
                <AppUsers />
              </>
            }
          />
          <Route
            path="/daily"
            element={
              <>
                <PageTitle title="Statistics | CGMMe Admin" />
                <Daily />
              </>
            }
          />
          <Route
            path="/overlay"
            element={
              <>
                <PageTitle title="Statistics | CGMMe Admin" />
                <Overlay />
              </>
            }
          />
          <Route
            path="/statistics"
            element={
              <>
                <PageTitle title="Statistics | CGMMe Admin" />
                <Statistics />
              </>
            }
          />
          <Route
            path="/trends"
            element={
              <>
                <PageTitle title="Statistics | CGMMe Admin" />
                <Trends />
              </>
            }
          />
          <Route
            path="/agp"
            element={
              <>
                <PageTitle title="Statistics | CGMMe Admin" />
                <AGP />
              </>
            }
          />
          <Route
            path="/report"
            element={
              <>
                <PageTitle title="Statistics | CGMMe Admin" />
                <Report />
              </>
            }
          />
          <Route
            path=":userId?/notes"
            element={
              <>
                <PageTitle title="User | CGMMe Admin" />
                <Alerts />
              </>
            }
          />
        </Route>

        <Route
          path="/messages"
          element={
            <>
              <PageTitle title="Messages | CGMMe Admin " />
              <FormElements />
            </>
          }
        />
        <Route
          path="/weekly"
          element={
            <>
              <PageTitle title="Weekly | CGMMe Admin" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | CGMMe Admin Panel" />
              <Settings />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="Sign In | CGMMe Admin Panel" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="Sign In | CGMMe Admin Panel" />
              <SignUp />
            </>
          }
        />

        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Settings | CGMMe Admin Panel" />

              <Chart />
              <Profile />
              <Calendar />
              <FormElements />
              <FormLayout />
              <Overview />
              <SignUp />
              <SignIn />
              <Buttons />
              <Alerts />
              <Card>
                <TableOne />
                <TableTwo />
                <TableThree />
              </Card>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
