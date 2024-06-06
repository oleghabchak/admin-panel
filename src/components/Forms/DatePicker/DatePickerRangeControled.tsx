import React, { useEffect, useState } from "react";
import moment from "moment";
import calendar from "../../../assets/icon/CalendarBlank.svg";
import calendar2 from "../../../assets/icon/CalendarPurple.svg";

import "react-dates/initialize";
import "./datepickerangecontroled.css";

import { DateRangePicker } from "react-dates";
import Button from "../../UiElements/Button";
import { useAppStore } from "../../../store/AppStoreProvider";
import { toJS } from "mobx";
import { setSeconds } from "date-fns";

const Calendar = () => {
  const store = useAppStore();
  console.log("STAT startDateE", toJS(store.startDate));
  const [startDate, setStartDate] = useState<moment.Moment | null>(
    moment().subtract(7, "days")
  );
  const [show, setShow] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<moment.Moment | null>(moment());
  const [focusedInput, setFocusedInput] = useState<
    "startDate" | "endDate" | null
  >(null);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(7);

  const handleDatesChange = ({
    startDate: newStartDate,
    endDate: newEndDate,
  }: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleApply = () => {
    store.setStartEndDate(startDate?._d, endDate?._d);
    setShow(false);
  };

  const handleFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };

  const handlePeriodSelect = (period: number) => {
    setSelectedPeriod(period);
  };

  useEffect(() => {
    setStartDate(startDate);
    setEndDate(endDate);
  }, []);

  return (
    <div className="z-9 relative w-115 h-fit my-4 flex flex-col">

      <div onClick={()=> setShow(true)} className="w-106 h-10 justify-start items-center gap-2 inline-flex cursor-pointer">
        <img src={calendar2} />

        <div className="w-6 h-6 px-0.5 pt-px pb-0.5 justify-center items-center flex" />
        <div className="text-gray-700 text-xl font-semibold  leading-7">
          {moment(store?.startDate).format("ddd MMM D, YYYY")}
        </div>
        <div className="text-gray-700 text-xl font-semibold  leading-7">- </div>
        <div className="text-gray-700 text-xl font-semibold  leading-7">
          {moment(store?.endDate).format("ddd MMM D, YYYY")}
        </div>
      </div>
{show &&
    <div className="w-115 p-10 bg-white rounded-3xl border border-lightGrey flex-col justify-start items-start gap-6 inline-flex absolute top-10 left-500">
    <div className="flex-col justify-start items-start gap-4 flex">
          <div className="text-gray-700 text-base font-bold  leading-normal">
            Select period:
          </div>
          <div className="justify-start items-start gap-2 inline-flex">
            {[7, 14, 21, 28].map((period) => (
              <div
                key={period}
                className={`px-4 py-2 rounded-3xl border border-lightGrey justify-start items-center gap-0.5 flex ${
                  selectedPeriod === period
                    ? "bg-lightPurple border-purple "
                    : ""
                }`}
              >
                <div
                  className={`text-gray-700 text-base font-semibold cursor-pointer leading-normal ${
                    selectedPeriod === period ? "text" : ""
                  }`}
                  onClick={() => handlePeriodSelect(period)}
                >
                  {period / 7} week
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="self-stretch h-28 flex-col justify-start items-start gap-4 flex">
          <div className="text-gray-700 text-base font-bold  leading-normal">
            Select date range:
          </div>

          <div className="w-96 flex-col justify-between items-start gap-2">
            <div className="basis-0 flex justify-start items-start gap-32">
              <div className="self-stretch text-gray-700 text-base font-medium  leading-normal">
                Start date:{" "}
              </div>
              <div className="self-stretch text-gray-700 text-base font-medium  leading-normal -mb-20">
                End date:{" "}
              </div>
            </div>
            <DateRangePicker
              startDateId="startDate"
              endDateId="endDate"
              minimumNights={7}
              startDate={startDate ? moment(startDate) : null}
              endDate={endDate ? moment(endDate) : null}
              onDatesChange={handleDatesChange}
              focusedInput={focusedInput}
              initialVisibleMonth={() => moment().add(-1, "months")}
              // customInputIcon={<img src={calendar} />}
              // inputIconPosition="after"
              displayFormat="MMM D YYYY"
              onFocusChange={handleFocusChange}
              endDateOffset={(day) => day.add(selectedPeriod, "days")}
              isOutsideRange={() => false}
            />
          </div>
        </div>
        <div className="w-96 justify-center items-center gap-2 inline-flex">
          <Button
            className={"w-48 h-10"}
            onClick={handleApply}
            variant={"primary"}
            size={"big"}
            title="Submit"
          ></Button>
          <Button
            className={"w-48 h-10"}
            variant={"secondary"}
            onClick={() =>setShow(false)}
            size={"big"}
            title="Cancel"
          ></Button>
        </div>
      </div>}

      {/* {startDate && endDate && (
        <div>
          <p>Selected Dates:</p>
          <p>Start Date: {startDate.format("YYYY-MM-DD")}</p>
          <p>End Date: {endDate.format("YYYY-MM-DD")}</p>
        </div>
      )} */}
    </div>
  );
};

export default Calendar;
