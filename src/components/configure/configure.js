import React, { useEffect, useState } from "react";
import { LeftPanel } from "../common/leftPanel/leftPanel";
import { Header } from "../common/header/header";
import httpClient from "../../util/httpClient";
import { notify } from "../../util/notify";
import axios from "axios";

export const Configure = () => {
  const [isOpen, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    term: "",
    year: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await httpClient.get("/settings");
      setSettings(data.settings);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_HOST}/settings`, settings)
      .then((response) => {
        notify.success("Succesfully Saved");
      })
      .catch((err) => {
        notify.error("Server Error");
      });
  };

  const handleSettings = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={isOpen ? "open" : ""}>
      <LeftPanel active={"configure"}></LeftPanel>
      <div id="right-panel" className="right-panel">
        <Header sidebar={changeSidebar} isOpen={isOpen}></Header>
        <div style={{ background: "white" }}>
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column justify-content-center align-items-center "
          >
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">TERM</label>
              <select
                className="custom-select"
                style={{ width: "100%" }}
                onChange={handleSettings}
                value={settings.term}
                name="term"
              >
                <option value="First">First</option>
                <option value="Second">Second</option>
                <option value="Third">Third</option>
                <option value="Final">Final</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">YEAR</label>
              <input
                onChange={handleSettings}
                type="text"
                name="year"
                className="form-control"
                id="exampleInputPassword1"
                value={settings.year}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
