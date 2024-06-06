import { weekdays } from 'moment';
import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import calendar from '../../../assets/icon/CalendarPurple.svg'
import { useAppStore } from '../../../store/AppStoreProvider';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

const Datepicker = observer(({}) => {
  const [show, setShow] = useState(false)
  const store = useAppStore();
  const options = {
    mode: 'range',
    static: true,
    monthSelectorType: 'static',
    dateFormat: 'D j M , Y',
    defaultDate: [new Date().setDate(new Date().getDate() - 7), new Date()],
    prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    onReady: (selectedDates: any, dateStr: string, instance: { element: { value: any; }; }) => {
      instance.element.value = dateStr.replace('to', '-');
    },
    onChange: (selectedDates: Date[], dateStr: string, instance: any) => {
      if (selectedDates.length === 2) {
        const diff = (selectedDates[1].getTime() - selectedDates[0].getTime()) / (1000 * 3600 * 24) + 1; // +1 to include both start and end dates in the count
        if (diff % 8 !== 0) {
          setShow(true)
        } else {
          store.setStartEndDate(selectedDates[0], selectedDates[1]);
          setShow(false)
        }
      }
    },
  }

  return (
    <div className="relative my-10 flex-col">
      <Flatpickr
       className="form-input pl-9  dark:bg-boxdark text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 font-medium w-1/3" options={options} />

      <div className="absolute inset-0 right-auto flex h-6  pointer-events-none">
        <img src={calendar}/>
      </div>
     {show &&
      <h5 className="absolute font-semibold text-[#B45454] w-1/2">
        Please choose range that is a multiple of 7 days
      </h5>}
    </div>
   );
  });

export default Datepicker;
