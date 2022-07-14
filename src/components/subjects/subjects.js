import React from "react";
import { LeftPanel } from "../common/leftPanel/leftPanel";
import { SubjectDetails } from "../subjectDetails/subjectDetails";

import { Header } from "./../common/header/header";

export class Subjects extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }
  changeSidebar = () => {
    this.setState((preState) => {
      return {
        isOpen: !preState.isOpen,
      };
    });
  };
  render() {
    return (
      <>
        <div className={this.state.isOpen ? "open" : ""}>
          <LeftPanel active={"subject"}></LeftPanel>
          <div id="right-panel" className="right-panel">
            <Header
              sidebar={this.changeSidebar}
              isOpen={this.state.isOpen}
            ></Header>
            <SubjectDetails></SubjectDetails>
          </div>
        </div>
      </>
    );
  }
}
