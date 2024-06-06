import React,{ useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import threeDots from "./../../assets/icon/threeDots.svg";
import { values } from "mobx";
import Switcher from "../Switchers/Switcher";

const ContentControl = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  // Update the active tab based on the current route
  React.useEffect(() => {
    const currentTab = location.pathname.replace("/", "").toUpperCase();
    setActiveTab(currentTab || "DAILY");
  }, [location.pathname]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab.toLowerCase()}`); // Redirect to the active tab URL
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="w-150 h-14 p-2 bg-body rounded-full justify-start dark:bg-boxdark-2 items-start inline-flex">
        {[
          {label:"Overlay", value:"OVERLAY"},
          {label:"Daily", value:"DAILY"},
          {label:"Statistics", value:"STATISTICS"},
          {label:"Trends", value:"TRENDS"},
          {label:"AGP", value:"AGP"},
          {label:"Report", value:"REPORT"},
           ].map(({ value, label}) => (
          <div
            key={value}
            className={`w-90 h-10 px-4 py-2 rounded-full justify-center items-center gap-2.5 flex cursor-pointer ${
              activeTab === value? "bg-primary" : ""
            }`}
            onClick={() => handleTabClick(value)}
          >
            <p
              className={`text-base font-medium ${
                activeTab === value? "text-white" : "text-black dark:text-lightGrey"
              }`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-6">
        <Switcher/>
        <img src={threeDots} alt="" />
      </div>
    </div>
  );
};

export default ContentControl;