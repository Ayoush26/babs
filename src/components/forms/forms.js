import { useEffect, useState } from "react";
import httpClient from "../../util/httpClient";
import { notify } from "../../util/notify";
import "./forms.css";

export const Form = () => {
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    roll: "",
    class: "",
    name: "",
    scores: {},
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      const { data } = await httpClient.get(`/subject/${formData.class}`);

      setSubjects(data.data);
    };

    if (formData.class === "") return;
    fetchSubjects();
  }, [formData.class]);

  useEffect(() => {
    const fetchStudent = async () => {
      const { data } = await httpClient.get(
        `/students/${formData.class}/${formData.roll}`
      );
      let name = "";
      if (data) name = data.Name;
      setFormData((prev) => ({ ...prev, name: name }));
    };
    if (formData.class === "" || formData.roll === "") return;
    fetchStudent();
  }, [formData.roll, formData.class]);

  const handleScore = (e, subjectName, fullMarks) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        scores: {
          ...prev.scores,
          [subjectName]: {
            ...prev.scores[subjectName],
            [name]: value,
            fullMarks,
          },
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    httpClient.post("/marksheet", formData).then((response) => {
      notify.success(response.data.msg);
      document.getElementById("form1").reset();
      document.getElementById("form2").reset();
      setFormData(() => ({
        roll: "",
        class: "",
        name: "",
        scores: {},
      }));
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
      <div className="col-6">
        <div className="card card-5">
          <div className="card-heading">
            <h2 className="title">Result Form</h2>
          </div>
          <div className="card-body">
            <form id="form1" onSubmit={handleSubmit} method="POST">
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
                  ADD TO MARKSHEET
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="card card-5">
          <div className="card-heading">
            <h2 className="title">Subjects</h2>
          </div>
          <div className="card-body">
            <form id="form2">
              {subjects.length === 0 ? (
                <h1>Select the class to display subject here</h1>
              ) : (
                subjects.map((subject) => {
                  return (
                    <div key={subject._id} className="form-row m-b-55">
                      <div className="name">
                        {subject.Name +
                          ` (${
                            subject.FullMarks === "Grade"
                              ? "G"
                              : subject.FullMarks
                          })`}
                      </div>
                      {subject.FullMarks === "Grade" ? (
                        <div className="value">
                          <div className="input-group">
                            <select
                              onChange={(e) => {
                                handleScore(e, subject.Name, subject.FullMarks);
                              }}
                              className="input--style-5"
                              type="text"
                              name="grade"
                              defaultValue="Choose Grade"
                              style={{
                                width: "100%",
                                lineHeight: "50px",
                                padding: "12px 50px",
                                border: "none",
                                outline: "none",
                              }}
                            >
                              <option value="Choose Grade" disabled="disabled">
                                Choose Grade
                              </option>
                              <option value="A+">A+</option>
                              <option value="A">A</option>
                              <option value="B+">B+</option>
                              <option value="B">B</option>
                              <option value="C+">C+</option>
                              <option value="C">C</option>
                              <option value="D+">D+</option>
                              <option value="D">D</option>
                            </select>
                          </div>{" "}
                        </div>
                      ) : (
                        <div className="value">
                          <div className="row row-refine">
                            <div className="col-6">
                              <div className="input-group-desc">
                                <input
                                  onChange={(e) => {
                                    handleScore(
                                      e,
                                      subject.Name,
                                      subject.FullMarks
                                    );
                                  }}
                                  className="input--style-5"
                                  type="number"
                                  name="exam"
                                />
                                <label className="label--desc">
                                  Exam Score
                                </label>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="input-group-desc">
                                <input
                                  onChange={(e) => {
                                    handleScore(
                                      e,
                                      subject.Name,
                                      subject.FullMarks
                                    );
                                  }}
                                  className="input--style-5"
                                  type="number"
                                  name="test"
                                />
                                <label className="label--desc">
                                  Test Score
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
