import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { goNextMonth, goPrevMonth, goToday } from "../store/calendar-slice";
import ThemeToggle from "./ThemeToggle";
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
type RootState = { calendar: { year: number; month: number } };

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
  const dispatch = useDispatch();
  const cal = useSelector((s: RootState) => s.calendar);
  return (
    <nav className="nav-container">
      <div className="nav-first min-w-0">
        <div className="burger-icon hover:bg-gray-700 cursor-pointer transition-colors rounded-lg center-text-grid active:bg-gray-600 transition-background-color p-2">
          <img src={burgerSimple} alt="burger" height="40px" width="40px" />
        </div>
        <div className="brand general-click p-2 box-border">DisciplineMe</div>
      </div>
      <div className="nav-second min-w-0">
        <button className="today-btn" onClick={() => dispatch(goToday())}>
          Today
        </button>
        <div className="month-nav">
          <button
            onClick={() => dispatch(goPrevMonth())}
            className="icon-btn"
            aria-label="Previous month"
          >
            <img
              src={leftArrow}
              alt="prev"
              height="18px"
              width="18px"
              className="invert"
            />
          </button>
          <span className="month-title">
            {months[cal.month]} {cal.year}
          </span>
          <button
            onClick={() => dispatch(goNextMonth())}
            className="icon-btn"
            aria-label="Next month"
          >
            <img
              src={rightArrow}
              alt="next"
              height="18px"
              width="18px"
              className="invert"
            />
          </button>
        </div>
      </div>
      <div className="nav-third min-w-0">
        <div className="search-wrap">
          <input className="search-input" placeholder="Search" />
        </div>
        <ThemeToggle />
        <div className="profile-avatar">DM</div>
      </div>
    </nav>
  );
}
