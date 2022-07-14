import React, { useState } from "react";
import { LeftPanel } from "../common/leftPanel/leftPanel";
import { Header } from "../common/header/header";
import { StudentDetials } from "../studentDetails/studentDetails";

export const Student = () => {
  const [isOpen, setOpen] = useState(false);

  const changeSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={isOpen ? "open" : ""}>
      <LeftPanel active={"students"}></LeftPanel>
      <div id="right-panel" className="right-panel">
        <Header sidebar={changeSidebar} isOpen={isOpen}></Header>
        <StudentDetials />
      </div>
    </div>
  );
};
