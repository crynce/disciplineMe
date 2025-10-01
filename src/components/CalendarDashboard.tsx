import CalendarLeftSidebar from "./CalendarLeftSidebar";
import DashboardNavContainer from "./DashboardNavContainer";
import Calendar from "./Calendar";
import EventModal from "./EventModal";
import ReminderScheduler from "./ReminderScheduler";

export default function CalendarDashboard() {
  return (
    <div className="calendar-dashboard-container">
      <div className="section1">
        <DashboardNavContainer />
      </div>
      <div className="section-2">
        <CalendarLeftSidebar />
        <div className="right-content-container">
          <Calendar />
        </div>
      </div>
      <EventModal />
      <ReminderScheduler />
    </div>
  );
}
