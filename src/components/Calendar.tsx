import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";
import dropDownArrow from "../assets/dropdown-arrow.svg";
import { useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function Calendar() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);
  // const thisMonthFirstDay = new Date(new Date().setDate(1)).getDay();
  const today = new Date();
  const dateObj = {
    today,
    todaysDate: today.getDate(),
    thisMonthFirstDay: new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    ).getDay(),
    thisMonth: today.getMonth(),
    thisYear: today.getFullYear(),
  };
  //month state
  const [dateState, setDateState] = useState(dateObj);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  function handleLeftArr() {
    if (dateState.thisMonth === 0) {
      setDateState((prev) => ({
        ...prev,
        thisMonth: 11,
        thisYear: prev.thisYear - 1,
        thisMonthFirstDay: new Date(prev.thisYear - 1, 11, 1).getDay(),
      }));
    } else {
      setDateState((prev) => ({
        ...prev,
        thisMonth: prev.thisMonth - 1,
        thisMonthFirstDay: new Date(
          prev.thisYear,
          prev.thisMonth - 1,
          1
        ).getDay(),
      }));
    }
  }
  function handleRightArr() {
    if (dateState.thisMonth === 11) {
      setDateState((prev) => ({
        ...prev,
        thisMonth: 0,
        thisYear: prev.thisYear + 1,
        thisMonthFirstDay: new Date(prev.thisYear + 1, 0, 1).getDay(),
      }));
    } else {
      setDateState((prev) => ({
        ...prev,
        thisMonth: prev.thisMonth + 1,
        thisMonthFirstDay: new Date(
          prev.thisYear,
          prev.thisMonth + 1,
          1
        ).getDay(),
      }));
    }
  }

  //handling date click
  function handleDateCick(e: React.MouseEvent<HTMLDivElement>) {
    const selectedDate = Number((e.target as HTMLDivElement).innerText);
    const year = dateState.thisYear;
    const month = dateState.thisMonth;
    setSelectedDate(new Date(year, month, selectedDate).getTime());
    console.log(new Date(year, month, selectedDate).toDateString());
  }

  const COL_START = [
    "", // index 0 unused
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  return (
    <div className="calendar-container">
      <div className="calendar-first-row">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold mb-4 text-white">
            {months[dateState?.thisMonth]} {dateState?.thisYear}
          </h1>
          <img
            src={dropDownArrow}
            alt=""
            height="20px"
            width="20px"
            // className="invert inline-block ml-2"
          />
        </div>
        <div className="grid grid-cols-2">
          <button onClick={handleLeftArr}>
            <img
              src={leftArrow}
              alt=""
              height="20px"
              width="20px"
              className="invert"
            />
          </button>
          <button onClick={handleRightArr}>
            <img
              src={rightArrow}
              alt=""
              height="20px"
              width="20px"
              className="invert"
            />
          </button>
        </div>
      </div>
      <div className="calendar-second-row">
        <div className="grid-weekdays-heading">
          {days.map((day) => (
            <div key={day} className="text-center font-semibold py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid-weekdays-dates">
          {dates.map((date) => {
            const colClass =
              date === 1 ? COL_START[dateState.thisMonthFirstDay + 1] : "";
            const dateSelected =
              selectedDate && new Date(selectedDate).getDate();
            return (
              <div
                key={date}
                className={`border-0 text-center cursor-pointer transition-colors rounded-lg center-text-grid leading-loose ${colClass} ${
                  dateSelected === date ? "hover:bg-blue-600 bg-blue-600" : ""
                } ${
                  dateSelected === date
                    ? "hover:bg-blue-600"
                    : "hover:bg-gray-700 "
                }`}
                onClick={handleDateCick}
              >
                {date}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
