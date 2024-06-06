import { useState } from "react";

const TabHeader = ({}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "statistics" | "notes">("statistics");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "statistics", label: "Statistics" },
    { id: "notes", label: "Notes" },
  ];

  const Tab = ({ id, label }: { id: string; label: string }) => (
    <div
      className={`${
        activeTab === id
          ? "bg-white dark:bg-boxdark border-b-primary border-b-3 dark:"
          : "bg-lightPurple dark:bg-black-2"
      } cursor-pointer w-48 h-16 px-10 py-5 rounded-tl-xl rounded-tr-xl justify-center items-center gap-2.5 inline-flex`}
      onClick={() => setActiveTab(id as "overview" | "statistics" | "notes")}
    >
      <div className="text-black text-2xl font-bold leading-loose">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex">
      {tabs.map((tab) => (
        <Tab key={tab.id} id={tab.id} label={tab.label} />
      ))}
    </div>
  );
};

export default TabHeader;