import { useEffect, useState, useRef } from "react";
import httpClient from "../../util/httpClient";
import { notify } from "../../util/notify";

export const AttendanceForm = () => {
  const formRef = useRef("");
  const [formData, setFormData] = useState({
    roll: "",
    class: "",
    name: "",
    attendance: "",
  });

  useEffect(() => {
    const fetchStudent = async () => {
      const { data } = await httpClient.get(
        `/students/${formData.class}/${formData.roll}`
      );
      let name = "";

      if (data) {
        name = data.Name;
      }
      setFormData((prev) => ({ ...prev, name }));
    };
    if (formData.class === "" || formData.roll === "") return;
    fetchStudent();
  }, [formData.roll, formData.class]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    httpClient.post(`/marksheet/attendance`, formData).then((res) => {
      notify.success(res.data.msg);
      formRef.current.reset();
      setFormData({
        roll: "",
        class: "",
        name: "",
        attendance: "",
      });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="row" style={{ transform: "scale(0.9)" }}>
      <div className="col-8">
        <div className="card card-5">
          <div className="card-heading">
            <h2 className="title">Attendance Form</h2>
          </div>
          <div className="card-body">
            <form
              ref={formRef}
              id="form1"
              onSubmit={handleSubmit}
              method="POST"
            >
              <div className="form-row m-b-55">
                <div className="name">Student Info</div>
                <div className="value">
                  <div className="row row-refine">
                    <div className="col-5">
                      <div className="input-group-desc">
                        <input
                          onChange={handleChange}
                          className="input--style-5"
                          type="text"
                          name="roll"
                        />
                        <label className="label--desc">Roll No.</label>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="input-group-desc">
                        <select
                          onChange={handleChange}
                          name="class"
                          className="input--style-5"
                          style={{
                            lineHeight: "50px",
                            padding: "12px 34px",
                            border: "none",
                            outline: "none",
                          }}
                          defaultValue="Select Class"
                        >
                          <option value="Select Class" disabled="disabled">
                            Select Class
                          </option>
                          <option value="Nursery">Nursery</option>
                          <option value="KG">KG</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        <label
                          className="label--desc"
                          style={{ marginLeft: "80px" }}
                        >
                          Class
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="name">Name</div>
                <div className="value">
                  <div className="input-group">
                    <input
                      id="name"
                      className="input--style-5"
                      type="text"
                      name="name"
                      defaultValue={formData.name}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="name">Attendance</div>
                <div className="value">
                  <div className="input-group">
                    <input
                      onChange={handleChange}
                      id="name"
                      className="input--style-5 w-50"
                      type="text"
                      name="attendance"
                    />
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  className="btn btn--radius-2 btn--red"
                  type="submit"
                  style={{
                    lineHeight: "50px",
                    padding: "0 50px",
                    width: "100%",
                  }}
                >
                  ADD ATTENDANCE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
