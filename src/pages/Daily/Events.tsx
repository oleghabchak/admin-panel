import { useState } from "react"; 
import food from "./../../assets/marks/Value=Food.svg"
import sleep from "./../../assets/marks/Value=Sleep.svg"
import medication from "./../../assets/marks/Value=Medication.svg"
import heart from "./../../assets/marks/Value=Heartbeat.svg"
import down from "./../../assets/icon/icon-arrow-down.svg";
import up from "./../../assets/icon/icon-arrow-up.svg";

const Events = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); 

  return (
    <div className="w-full mt-6 rounded-xl border border-primary flex-col justify-start items-start inline-flex">
      <div onClick={() => setIsOpen(!isOpen)} className=" hover:cursor-pointer px-4 w-full py-2 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
        <div className="text-gray-700 text-xl font-semibold   leading-7">Events</div>
        {isOpen ? <img src={up} /> : <img src={down} />}
      </div>
      {isOpen && (
      <div className="h-9 self-stretch px-4 py-2 bg-lightPurple justify-between items-center inline-flex">
        <div className="w-9 text-gray-700 text-sm font-medium   leading-tight">Type</div>
        <div className="w-40 text-gray-700 text-sm font-medium   leading-tight">Time</div>
        <div className="w-40 text-gray-700 text-sm font-medium   leading-tight">Device</div>
        <div className="w-40 text-gray-700 text-sm font-medium   leading-tight">Event</div>
        <div className="w-40 text-gray-700 text-sm font-medium   leading-tight">Details</div>
        <div className="w-40 text-gray-700 text-sm font-medium   leading-tight">Glucose</div>
      </div>)}
      {isOpen && (
      <div className=" self-stretch flex-col justify-start items-start">
        {[
          {
            icon: heart,
            time: "1:34 AM",
            device: "Dexcom",
            event: "Alert",
            details: "High",
            glucose: "12.4 mmol/L"
          },
          {
            icon: medication,
            time: "2:14 AM",
            device: "CGM Me",
            event: "Fast Acting Insulin",
            details: "Rapid acting",
            glucose: "12.4 mmol/L"
          },
          {
            icon: sleep,
            time: "8:12 AM",
            device: "Apple Watch",
            event: "Activity",
            details: "Activity",
            glucose: "6.3 mmol/L"
          },
          {
            icon: food,
            time: "10:34 AM",
            device: "Dexcom",
            event: "Alert",
            details: "Urgent High",
            glucose: "13.8 mmol/L"
          },
          {
            icon: heart,
            time: "11:35 AM",
            device: "CGM Me",
            event: "Manual",
            details: "Food",
            glucose: "7.2 mmol/L"
          },
          {
            icon: sleep,
            time: "2:14 AM",
            device: "CGM Me",
            event: "Long Acting Insulin",
            details: "Rapid acting",
            glucose: "12.4 mmol/L"
          },
          {
            icon: heart,
            time: "3:29 PM",
            device: "Dexcom",
            event: "Alert",
            details: "Urgent Low",
            glucose: "2.8 mmol/L"
          }
        ].map((event, index) => (
          <div key={index} className=" w-full self-stretch px-6 py-2 justify-between items-center inline-flex hover:bg-lightPurple">
            <div className="w-9 h-6 relative">
              <div className="w-6 h-6 left-0 top-0 absolute">
                <img src={event.icon} />
              </div>
            </div>
            <div className="w-40 text-gray-700 text-sm font-medium   leading-tight">{event.time}</div>
            <div className="w-40 text-gray-700 text-sm font-medium   leading-tight">{event.device}</div>
            <div className="w-40 text-gray-700 text-sm font-medium   leading-tight">{event.event}</div>
            <div className="w-40 text-gray-700 text-sm font-medium   leading-tight">{event.details}</div>
            <div className="w-40 text-gray-700 text-sm font-medium   leading-tight">{event.glucose}</div>
            <div className="w-6 h-6 left-[1091px] top-[32px] absolute origin-top-left -rotate-90" />
          </div>
        ))}
      </div>)}
    </div>
  );
};

export default Events;