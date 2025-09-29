import { useState } from "react";
import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";
import burgerSimple from "../assets/burger-simple.svg";
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
export default function DashboardNavContainer() {
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
  return (
    <nav className="nav-container">
      <div className="nav-first">
        <div className="burger-icon hover:bg-gray-700 cursor-pointer transition-colors rounded-lg center-text-grid active:bg-gray-600 transition-background-color p-2">
          <img src={burgerSimple} alt="burger" height="40px" width="40px" />
        </div>
        <div className="general-padding-2 general-click p-2 box-border">
          DisciplineMe
        </div>
      </div>
      <div className="nav-second">
        <div className="nav-second-first general-click general-padding-2">
          Today
        </div>
        <div className="nav-second-second">
          <div className="nav-second-second-calendar-nav">
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-2">
                <button
                  onClick={handleLeftArr}
                  className="general-click general-padding-2"
                >
                  <img
                    src={leftArrow}
                    alt=""
                    height="20px"
                    width="20px"
                    className="invert"
                  />
                </button>
                <button
                  onClick={handleRightArr}
                  className="general-click general-padding-2"
                >
                  <img
                    src={rightArrow}
                    alt=""
                    height="20px"
                    width="20px"
                    className="invert"
                  />
                </button>
              </div>
              <p className="text-xl font-bold mb-4 text-white general-click general-padding-2">
                {months[dateState?.thisMonth]} {dateState?.thisYear}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-third">profile</div>
    </nav>
  );
}
