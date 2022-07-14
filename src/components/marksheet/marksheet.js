import React from "react";
import Axios from "axios";
import { Loader } from "../common/loader/loader";
import { withRouter } from "react-router-dom";
import { notify } from "../../util/notify";
import Modal from "react-modal";

class MarksheetWithoutRouter extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [
        {
          marksInfo: {},
        },
      ],
      isLoading: false,
      class: "Nursery",
      subjects: [
        {
          Name: "",
        },
      ],
      modalIsOpen: false,
      currentResult: {
        marksInfo: {},
        index: "",
      },
      fullMarks: {},
    };
  }

  componentDidMount() {
    this.setState(
      (prevState) => {
        return {
          isLoading: !prevState.isLoading,
        };
      },
      () => {
        Axios.get(`${process.env.REACT_APP_HOST}/marksheet/${this.state.class}`)
          .then(async (data) => {
            const subjectData = await Axios.get(
              `${process.env.REACT_APP_HOST}/subject/${this.state.class}`
            );
            const subjects = subjectData.data.data;
            let newFullMarks = {};
            subjects.forEach((subject) => {
              newFullMarks[subject.Name] = subject.FullMarks;
            });
            const results = data.data.data;
            this.setState({
              results,
              subjects,
              fullMarks: newFullMarks,
            });
          })
          .catch((err) => {
            console.log(err.response);
          })
          .finally(() => {
            this.setState((prevState) => {
              return {
                isLoading: !prevState.isLoading,
              };
            });
          });
      }
    );
  }

  handlePrint = async (id) => {
    try {
      const check = window.confirm("Are you sure you want to delete?");
      if (check) {
        const prevClass = this.state.class;
        await Axios.delete(
          `${process.env.REACT_APP_HOST}/marksheet/delete/${id}`
        );
        notify.success("Succesfully Deleted");
        const { data } = await Axios.get(
          `${process.env.REACT_APP_HOST}/marksheet/${prevClass}`
        );
        const results = data.data;
        this.setState((prevState) => {
          return {
            ...prevState,
            results,
            class: prevClass,
          };
        });
      } else {
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleClass = (value) => {
    this.setState(
      () => {
        return {
          isLoading: true,
        };
      },
      async () => {
        try {
          const subjectData = await Axios.get(
            `${process.env.REACT_APP_HOST}/subject/${value}`
          );
          const subjects = subjectData.data.data;
          const { data } = await Axios.get(
            `${process.env.REACT_APP_HOST}/marksheet/${value}`
          );
          const results = data.data;
          let newFullMarks = {};
          subjects.map((subject) => {
            newFullMarks[subject.Name] = subject.FullMarks;
          });
          this.setState((preState) => {
            return {
              ...preState,
              class: value,
              results,
              subjects,
              fullMarks: newFullMarks,
              isLoading: false,
            };
          });
        } catch (e) {
          console.log(e);
        }
      }
    );
  };
  handleEdit = async () => {
    try {
      const editedData = this.state.currentResult;
      editedData.fullMarks = this.state.fullMarks;
      const res = await Axios.put(
        `${process.env.REACT_APP_HOST}/marksheet/edit/${editedData._id}`,
        editedData,
        {
          headers: { "Content-Type": "application/json" },
          responseType: "json",
        }
      );
      notify.success(res.data.msg);
      const { data } = await Axios.get(
        `${process.env.REACT_APP_HOST}/marksheet/${this.state.class}`
      );
      const results = data.data;
      this.setState((preState) => {
        return {
          ...preState,
          modalIsOpen: false,
          results,
        };
      });
    } catch (e) {
      console.log(e);
    }
  };
  openModal = (index) => {
    this.setState((preState) => {
      return {
        ...preState,
        modalIsOpen: true,
        currentResult: {
          ...preState.results[index],
        },
      };
    });
  };
  closeModal = () => {
    this.setState((preState) => {
      return {
        ...preState,
        modalIsOpen: false,
      };
    });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((preState) => {
      return {
        ...preState,
        currentResult: {
          ...preState.currentResult,
          [name]: value,
          marksInfo: {
            ...preState.currentResult.marksInfo,
          },
        },
      };
    });
  };
  handleMarks = (subjectName, fullMarks, e) => {
    const { name, value } = e.target;
    this.setState((preState) => {
      return {
        ...preState,
        currentResult: {
          ...preState.currentResult,
          marksInfo: {
            ...preState.currentResult.marksInfo,
            [subjectName]: {
              ...preState.currentResult.marksInfo[subjectName],
              [name]: value,
              fullMarks,
            },
          },
        },
      };
    });
  };

  handleClick = () => {
    this.props.history.push(`/sheet?class=${this.state.class}`);
  };

  handleDoublePrint = () => {
    this.props.history.push(
      `/newResult2?&${this.state.class}&${this.state.currentResult.index}`
    );
  };
  render() {
    console.log(this.state);
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "20%",
        transform: "translate(-50%, -50%)",
        overflowY: "auto",
      },
    };

    const tableHeadContent = this.state.subjects.map((subject) => {
      return <th key={subject._id}>{subject.Name}</th>;
    });

    const tableContent = this.state.results.map((result, index) => {
      return (
        <tr key={result._id}>
          <td>{result.Roll}</td>
          <td>{result.Name} </td>

          {this.state.subjects.map(({ Name, _id, FullMarks }) => {
            return (
              <td key={_id}>
                {FullMarks === "Grade"
                  ? result.marksInfo[Name]?.grade
                  : +result.marksInfo[Name]?.exam +
                    (result.marksInfo[Name]?.test
                      ? +result.marksInfo[Name].test
                      : 0)}
              </td>
            );
          })}

          <td>{result.percentage}%</td>
          <td>
            <button
              onClick={this.openModal.bind(this, index)}
              className="btn btn-info m-1"
            >
              Edit
            </button>

            <button
              onClick={this.handlePrint.bind(this, result._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

    let activebutton = "btn-primary active";
    return this.state.isLoading ? (
      <Loader></Loader>
    ) : (
      <>
        <div className="orders">
          <div className="row">
            <div className="col-xl-4"></div> {/* /.col-md-4 */}
            <div className="col-xl-4"></div> {/* /.col-md-4 */}
            <div className="col-xl-4">
              <div className="row">
                <div className="col-lg-12 col-xl-12">
                  <div className="card bg-flat-color-3  ">
                    <div className="card-body">
                      <h4 className="card-title m-0  white-color ">
                        Today's Date:{" "}
                      </h4>
                    </div>
                    <div className="card-body">
                      <div id="flotLine5" className="flot-line" />
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* /.col-md-4 */}
          </div>
          <div className="row " style={{ marginBottom: "10px" }}>
            <div className="col-lg-12 col-xl-12">
              <button
                onClick={this.handleClass.bind(this, "Nursery")}
                className={`btn m-1 ${
                  this.state.class === "Nursery" ? activebutton : null
                }`}
              >
                Nursery
              </button>
              <button
                onClick={this.handleClass.bind(this, "KG")}
                className={`btn m-1 ${
                  this.state.class === "KG" ? activebutton : null
                }`}
              >
                KG
              </button>
              <button
                onClick={this.handleClass.bind(this, "1")}
                className={`btn m-1 ${
                  this.state.class === "1" ? activebutton : null
                }`}
              >
                1
              </button>
              <button
                onClick={this.handleClass.bind(this, "2")}
                className={`btn m-1 ${
                  this.state.class === "2" ? activebutton : null
                }`}
              >
                2
              </button>
              <button
                onClick={this.handleClass.bind(this, "3")}
                className={`btn m-1 ${
                  this.state.class === "3" ? activebutton : null
                }`}
              >
                3
              </button>
              <button
                onClick={this.handleClass.bind(this, "4")}
                className={`btn m-1 ${
                  this.state.class === "4" ? activebutton : null
                }`}
              >
                4
              </button>
              <button
                onClick={this.handleClass.bind(this, "5")}
                className={`btn m-1 ${
                  this.state.class === "5" ? activebutton : null
                }`}
              >
                5
              </button>
              <button
                onClick={this.handleClass.bind(this, "6")}
                className={`btn m-1 ${
                  this.state.class === "6" ? activebutton : null
                }`}
              >
                6
              </button>
              <button
                onClick={this.handleClass.bind(this, "7")}
                className={`btn m-1 ${
                  this.state.class === "7" ? activebutton : null
                }`}
              >
                7
              </button>
              <button
                onClick={this.handleClass.bind(this, "8")}
                className={`btn m-1 ${
                  this.state.class === "8" ? activebutton : null
                }`}
              >
                8
              </button>
              <button
                onClick={this.handleClass.bind(this, "9")}
                className={`btn m-1 ${
                  this.state.class === "9" ? activebutton : null
                }`}
              >
                9
              </button>
              <button
                onClick={this.handleClass.bind(this, "10")}
                className={`btn m-1 ${
                  this.state.class === "10" ? activebutton : null
                }`}
              >
                10
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  <input
                    type="number"
                    name="index"
                    onChange={this.handleChange}
                    class="form-control"
                    style={{ maxWidth: "7%" }}
                  />
                  <button
                    onClick={this.handleDoublePrint}
                    className="btn btn-info m-1"
                  >
                    Print
                  </button>
                  <button
                    onClick={this.handleClick}
                    className={`btn btn-success`}
                    style={{ float: "right" }}
                  >
                    View Marksheet
                  </button>
                </div>
                <div className="card-body--">
                  <div className="table-stats order-table ov-h">
                    <table className="table ">
                      <thead>
                        <tr>
                          <th>Roll</th>
                          <th>Name</th>

                          {tableHeadContent}
                          <th>Percent</th>
                          <th>More</th>
                        </tr>
                      </thead>
                      <tbody>{tableContent}</tbody>
                    </table>
                  </div>{" "}
                  {/* /.table-stats */}
                </div>
              </div>{" "}
              {/* /.card */}
            </div>{" "}
            {/* /.col-lg-8 */}
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Edit Marksheet"
        >
          {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}

          <form className="form-group">
            <div className="row">
              {this.state.subjects.map((subject) => {
                return (
                  <div className="col-4">
                    <label>
                      <h5 className="pt-1">{subject.Name}</h5>
                    </label>
                    {subject.FullMarks === "Grade" ? (
                      <input
                        type="text"
                        onChange={this.handleMarks.bind(
                          "this",
                          subject.Name,
                          subject.FullMarks
                        )}
                        name="grade"
                        defaultValue={
                          this.state.currentResult.marksInfo[subject.Name]
                            ?.grade
                        }
                        className="form-control"
                      ></input>
                    ) : (
                      <>
                        <p>Exam</p>
                        <input
                          type="text"
                          onChange={this.handleMarks.bind(
                            "this",
                            subject.Name,
                            subject.FullMarks
                          )}
                          name="exam"
                          defaultValue={
                            this.state.currentResult.marksInfo[subject.Name]
                              ?.exam
                          }
                          className="form-control mb-2"
                        ></input>

                        <p>Test</p>
                        <input
                          type="text"
                          onChange={this.handleMarks.bind(
                            "this",
                            subject.Name,
                            subject.FullMarks
                          )}
                          name="test"
                          defaultValue={
                            this.state.currentResult.marksInfo[subject.Name]
                              ?.test
                          }
                          className="form-control"
                        ></input>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </form>
          <button className="btn btn-warning" onClick={this.handleEdit}>
            Save Changes
          </button>
          <button className="btn btn-danger m-1" onClick={this.closeModal}>
            Close
          </button>
        </Modal>
      </>
    );
  }
}

export const Marksheet = withRouter(MarksheetWithoutRouter);
