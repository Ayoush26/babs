import { useEffect, useState } from "react";
import Modal from "react-modal";
import { notify } from "../../util/notify";
import httpClient from "./../../util/httpClient";
import axios from "axios";

export const StudentTable = ({ level }) => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setModal] = useState(false);
  const [student, setStudent] = useState({
    roll: "",
    name: "",
    level,
  });
  const [isEdit, setEdit] = useState(false);
  const [selectedId, setId] = useState("");

  const closeModal = () => {
    setModal(false);
  };

  const openModal = (isEdit, id) => {
    setModal(true);
    setEdit(isEdit);
    if (typeof id === "string") setId(id);
  };

  useEffect(() => {
    if (!isEdit) return;
    httpClient.get(`/students/edit/${selectedId}`).then((res) => {
      setStudent({
        roll: res.data.Roll,
        name: res.data.Name,
        level: res.data.Class,
      });
    });
  }, [isEdit, selectedId]);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await httpClient.get(`/students/${level}`);
      setStudents(data);
    };

    fetchStudents();
  }, [level]);

  const handleStudent = () => {
    httpClient.post("/students", student).then((res) => {
      notify.success(res.data.msg);
      closeModal();
      const fetchStudents = async () => {
        const { data } = await httpClient.get(`/students/${level}`);
        setStudents(data);
      };

      fetchStudents();
    });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;
    axios
      .delete(`${process.env.REACT_APP_HOST}/students/edit/${id}`)
      .then((res) => {
        notify.success(res.data.msg);
        const fetchStudents = async () => {
          const { data } = await httpClient.get(`/students/${level}`);
          setStudents(data);
        };

        fetchStudents();
      });
  };

  const handleEdit = () => {
    axios
      .put(`${process.env.REACT_APP_HOST}/students/edit/${selectedId}`, student)
      .then((res) => {
        notify.success(res.data.msg);
        closeModal();
        const fetchStudents = async () => {
          const { data } = await httpClient.get(`/students/${level}`);
          setStudents(data);
        };

        fetchStudents();
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="card mt-5">
      <div className="card-header">
        <strong className="card-title">Students</strong>
        <button
          onClick={openModal.bind(null, false)}
          className="btn btn-success"
          style={{ float: "right" }}
        >
          Add
        </button>
      </div>
      <div className="table-stats order-table ov-h">
        <table className="table ">
          <thead>
            <tr>
              <th>Roll</th>
              <th className="text-left">Name</th>
              <th className="text-right">More</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              return (
                <tr key={student._id}>
                  <td>
                    {" "}
                    <span className="name">{student.Roll}</span>{" "}
                  </td>
                  <td className="text-left">
                    {" "}
                    <span className="name">{student.Name}</span>{" "}
                  </td>
                  <td>
                    <button
                      onClick={openModal.bind(null, true, student._id)}
                      className="btn btn-info m-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete.bind(null, student._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Student Modal"
          style={customStyles}
        >
          {isEdit ? (
            <>
              <form className="form-group">
                <label>
                  <h5>Name:</h5>
                </label>
                <input
                  onChange={handleChange}
                  name="name"
                  className="form-control"
                  defaultValue={student.name}
                ></input>
                <label>
                  <h5 className="pt-1">Roll No:</h5>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="roll"
                  className="form-control"
                  defaultValue={student.roll}
                ></input>
              </form>
              <button onClick={handleEdit} className="btn btn-warning">
                Save Changes
              </button>
              <button onClick={closeModal} className="btn btn-danger m-1">
                Close
              </button>
            </>
          ) : (
            <>
              <form className="form-group">
                <label>
                  <h5>Name:</h5>
                </label>
                <input
                  onChange={handleChange}
                  name="name"
                  className="form-control"
                ></input>
                <label>
                  <h5 className="pt-1">Roll No:</h5>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="roll"
                  className="form-control"
                ></input>
              </form>
              <button onClick={handleStudent} className="btn btn-warning">
                Add Student
              </button>
              <button onClick={closeModal} className="btn btn-danger m-1">
                Close
              </button>
            </>
          )}
        </Modal>
      </div>{" "}
      {/* /.table-stats */}
    </div>
  );
};
