import React, { useState } from "react";
import { LeftPanel } from "../common/leftPanel/leftPanel";
import { Header } from "../common/header/header";
import { AttendanceForm } from "../attendanceForm/attendanceForm";

export const Attendance = () => {
  const [isOpen, setOpen] = useState(false);

  const changeSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={isOpen ? "open" : ""}>
      <LeftPanel active={"attendance"}></LeftPanel>
      <div id="right-panel" className="right-panel">
        <Header sidebar={changeSidebar} isOpen={isOpen}></Header>

        <AttendanceForm />
      </div>
    </div>
  );
};
