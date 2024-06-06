import { useState } from "react";
import down from "./../../assets/icon/icon-arrow-down.svg";
import up from "./../../assets/icon/icon-arrow-up.svg";

const Events = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const notes = [
    {
      type: "Personal",
      content: "I forgot to take an insulin injection before dinner",
      time: "10:57 AM",
      color: "lightRed",
    },
    {
      type: "Medications",
      content: "Took my cholesterol medication",
      time: "9:14 PM",
      color: "lightPurple",
    },
    {
      type: "Mental health",
      content: "Feeling a bit anxious today",
      time: "9:14 PM",
      color: "lightYellow",
    },
  ];

  return (
    <div className="w-full mt-6 flex-col justify-start items-start gap-2 inline-flex">
      <div onClick={()=>setIsOpen(!isOpen)} className="self-stretch h-12 px-4 py-2 rounded-xl border border-zinc-200 justify-between items-center inline-flex hover:cursor-pointer">
        <div className="h-6 justify-start items-center gap-2 flex">
          <div className="text-gray-700 text-lg font-bold   leading-relaxed">
            Patient’s notes
          </div>
          <div className="w-6 h-6 p-2.5 bg-purple rounded-2xl flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-sm font-bold   leading-tight">
              +3
            </div>
          </div>
        </div>
        {isOpen? <img src={up} /> : <img src={down} />}

      </div>
      {isOpen && (
        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          {notes.map((note, index) => (
            <div key={index} className={`w-64 p-4 bg-lightYellow rounded-xl flex-col justify-start items-start gap-3 inline-flex`}>
              <div className={`px-2 py-1 bg-${note.color === "lightRed"? "lightRed" : note.color === "lightPurple"? "lightPurple" : "sky-100"} rounded-2xl justify-center items-center gap-2.5 inline-flex`}>
                <div className={`text-${note.color === "lightRed"? "red" : note.color === "lightPurple"? "purple" : "cyan-600"} text-xs font-bold   leading-none`}>
                  {note.type}
                </div>
              </div>
              <div className="self-stretch h-16 flex-col justify-start items-start gap-2 flex">
                <div className="self-stretch text-gray-700 text-base font-medium   leading-normal">
                  {note.content}
                </div>
                <div className="self-stretch justify-start items-start gap-2 inline-flex">
                  <div className="grow shrink basis-0 text-right text-zinc-400 text-xs font-medium   leading-none">
                    {note.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;