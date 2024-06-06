import { Link } from "react-router-dom";
import Card from "../../components/Card";
import ProductTwo from "./../../assets/product/product-02.png";
import { format } from "date-fns";
import { toJS } from "mobx";
import newIcon from "./../../assets/icon/New.svg";
import { useAppStore } from "../../store/AppStoreProvider";
import { User } from "../../types/user";

const formatDiagnosisDate = (dateString) => {
  if (!dateString) return "- - -";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" })
    .format(date)
    .replace(/ /, ", ");
};
const formatInteractionDate = (dateString) => {
  if (!dateString) return "- - -";

  const date = new Date(dateString);
  // Adjust the replace method to correctly insert the comma after the month
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(date)
    .replace(/(\s)(\w+)$/, ", $2");
};

const UserRow = ({ user }) => {
  const store = useAppStore();
  return(
  <Link
    className="font-medium"
    onClick={() => {
      localStorage.setItem("selectedUser", JSON.stringify(user));
      store.setSelectedUser(user);
    }}
    to={`/daily`}
  >
    <div className="grid grid-cols-7 sm:grid-cols-10 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
      <div className="col-span-3 flex items-center">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="h-10 w-10 rounded-full">
            <img
              className="h-10 w-10 rounded-full"
              src={ProductTwo}
              alt="User"
            />
          </div>
          <div className="flex-col">
            <p className="title-xs font-bold text-black dark:text-white">
              {user.firstName ? user.firstName : "- - -"}{" "}
              {user.secondName ? user.secondName : "- - -"}
            </p>
            <p className="text-sm text-black dark:text-white">
              {user.username ? user.username : "- - -"}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex justify-start items-center">
        <p className="flex justify-center items-center title-xs font-bold text-black dark:text-white">
          {user.subscription
            ? capitalizeFirstLetter(user.subscription)
            : "- - -"}
        </p>
      </div>
      <div className="col-span-1 flex justify-start items-center">
        <p className="flex justify-center items-center title-xs font-bold text-black dark:text-white">
          {getDiabeticType(user.diabeticType)}
        </p>
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <p
          className={`flex justify-center items-center w-24 rounded-full py-1 px-3 text-sm font-medium ${getStatusClass(
            user.status
          )}`}
        >
          {getStatus(user.status)}
        </p>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <p className="flex justify-center items-center title-xs font-bold text-black dark:text-white">
          {user.diagnosisDate &&
          new Date() - new Date(user.diagnosisDate) < 7889400000 ? (
            <img className="mr-1" src={newIcon} />
          ) : null}
          {user.diagnosisDate
            ? formatDiagnosisDate(user.diagnosisDate)
            : "- - -"}
        </p>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <p className="flex justify-center items-center title-xs font-bold text-black dark:text-white">
          {user.lastInteraction
            ? formatInteractionDate(user?.lastInteraction)
            : "- - -"}
        </p>
        {/* <div className="border-2 rounded-full border-solid border-red">
          <p className="flex justify-center items-center title-xs font-bold text-black dark:text-white">
            {user.lastInteraction ? formatInteractionDate(user?.lastInteraction) : "- - -"}
          </p>
        </div>
        <p className="flex justify-center items-center title-xs font-bold text-black dark:text-white">
          {user.lastInteraction ? formatInteractionDate(user?.lastInteraction) : "- - -"}
        </p> */}
      </div>
    </div>
  </Link>
)};

const getStatusClass = (status) => {
  const statusClasses = {
    good: "bg-lightGreen text-green",
    critical: "bg-lightRed text-red",
    default: "bg-lightOrange text-orange",
  };
  return statusClasses[status] || statusClasses.Default;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getDiabeticType = (type) => {
  switch (type) {
    case "type1":
      return "1 type";
    case "type2":
      return "2 type";
    default:
      return "- - -";
  }
};
const getStatus = (type) => {
  switch (type) {
    case "good":
      return "Good";
    case "medium":
      return "Medium";
    case "critical":
      return "Critical";
    default:
      return "- - -";
  }
};

const UsersList = ({ userData }: any) => {
  return (
    <>
      {userData.length > 0 && (
        <Card style={{ padding: 0 }}>
          {/* Header */}

          <div className="grid grid-cols-7 sm:grid-cols-10 border-b border-b-lightGrey border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
            <div className="col-span-3 flex items-baseline">
              <p className="text-darkGrey justify-center text-base font-semibold leading-normal">
                Name
              </p>
            </div>
            <div className="col-span-1 hidden sm:flex justify-start items-baseline">
              <p className="text-darkGrey justify-center text-base font-semibold leading-normal">
                Subscription
              </p>
            </div>
            <div className="col-span-1 flex justify-start items-start">
              <p className="text-darkGrey text-base font-semibold leading-normal">
                Diabetes type
              </p>
            </div>
            <div className="col-span-1 flex justify-center items-baseline">
              <p className="text-darkGrey text-base font-semibold leading-normal">
                Status
              </p>
            </div>
            <div className="col-span-2 flex justify-center items-baseline">
              <p className="text-darkGrey text-base font-semibold leading-normal">
                Diagnosis date
              </p>
            </div>
            <div className="col-span-2 flex justify-center items-baseline">
              <p className="text-darkGrey text-base font-semibold leading-normal">
                Last interaction
              </p>
            </div>
          </div>

          {/* User Rows */}
          {userData.map((user) => (
            <UserRow key={user.userId} user={user} />
          ))}
        </Card>
      )}
    </>
  );
};

export default UsersList;
