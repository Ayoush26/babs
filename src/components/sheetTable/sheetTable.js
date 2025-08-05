import axios from "axios";
import React, { Component } from "react";
import "./sheetTable.css";
import logo from "./../../images/logo.png";
import grade from "./../../util/grade";
import gradetoGPA from "../../util/gradetoGPA";
import mpg from "../../util/mpg";
export class SheetTable extends Component {
  constructor() {
    super();
    this.state = {
      class: "Nursery",
      results: [
        {
          marksInfo: {},
        },
      ],
      subjects: [],
    };
  }

  componentDidMount() {
    this.setState(
      () => {
        return {
          class: this.props.location.search.split("=")[1],
        };
      },
      async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_HOST}/marksheet/${this.state.class}`
        );
        const subjectData = await axios.get(
          `${process.env.REACT_APP_HOST}/subject/${this.state.class}`
        );
        const subjects = subjectData.data.data;
        let subjectName = [];
        subjects.forEach((subject) => {
          let name = `${subject.Name}`;
          subjectName.push(name);
          name = "";
        });
        console.log(subjectName);
        this.setState((preState) => {
          return {
            ...preState,
            results: data.data,
            subjects: subjectName,
          };
        });
      }
    );
  }

  render() {
    console.log(this.state);
    const students = JSON.parse(JSON.stringify(this.state.results));
    const currentClass = this.state.class;

    // 1. Calculate GPA for all students
    students.forEach(student => {
      const marksInfo = student.marksInfo;
      const subjects = Object.keys(marksInfo);

      let totalGradePoint = 0;
      let totalCredit = 0;

      subjects.forEach(subject => {
        const info = marksInfo[subject];
        // Skip if fullMarks is "Grade"
        if (info.fullMarks === "Grade") {
          return;
        }
        const credit = info.fullMarks === "50" ? 2 : 4;
        totalCredit += credit;

        const examMarks = +info.exam || 0;
        const testMarks = +info.test || 0;
        const sumMarks = examMarks + testMarks;

        const gradePoint = mpg(sumMarks, +info.fullMarks).gradePoint;
        totalGradePoint += gradePoint * credit;
      });

      student.gpa = totalCredit ? +(totalGradePoint / totalCredit).toFixed(2) : 0;
    });


    // 2. Decide the sort/rank key
    const percentageClasses = ["Nursery", "KG", "1", "2", "3"];
    const sortKey = percentageClasses.includes(currentClass) ? "percentage" : "gpa";

    // 3. Sort by the correct field
    students.sort((a, b) => b[sortKey] - a[sortKey]);

    // 4. Assign dense rank by the sort field
    let prevValue = null;
    let rank = 0;

    for (let i = 0; i < students.length; i++) {
      if (students[i][sortKey] !== prevValue) {
        rank += 1;
      }
      students[i].rank = rank;
      prevValue = students[i][sortKey];
    }



    students.sort((a, b) => Number(a.Roll) - Number(b.Roll));

    const tableContent = students.map((result, index) => {
      return (
        <tr key={result._id}>
          <td className="tableDimension">{result.Roll}</td>
          <td className="tableDimension">{result.Name}</td>

          {this.state.subjects.map((subject, index) => {
            return (
              <td className="tableDimension" key={index}>
                {result.marksInfo[subject]
                  ? result.marksInfo[subject].fullMarks === "Grade"
                    ? result.marksInfo[subject].grade
                    : +result.marksInfo[subject].exam +
                    (result.marksInfo[subject].test
                      ? +result.marksInfo[subject].test
                      : 0)
                  : "NG"}
              </td>
            );
          })}
          <td className="tableDimension">{result.rank}</td>
          <td className="tableDimension">{grade(result.percentage)}</td>
          <td className="tableDimension">{result.gpa}</td>
        </tr>
      );
    });

    return (
      <>
        <div style={{ width: "100%" }}>
          <div className="card-body p-0">
            <h3 className="text-center p-2 font-weight-bold">
              BUDDHA &nbsp; ADARSHA &nbsp; BOARDING &nbsp; SCHOOL
            </h3>
            <h5 className="text-center p-2 font-weight-bold">
              {" "}
              DIP PATH, DHARAN-9, SUNSARI, NEPAL
            </h5>
            <h4 className="text-center p-2 font-weight-bold">
              MARK SHEET OF FIRST TERM EXAM, 2082 BS
            </h4>

            <div className="row p-2">
              <div className="col-md-4 text-center"></div>
              <div className="col-md-4 text-center">
                <img src={logo} alt="Logo" />
              </div>
              <div className="col-md-4 text-center"></div>
            </div>
          </div>
        </div>
        <div>
          <h4 style={{ margin: "10px", paddingLeft: "50px" }}>
            Class: {this.state.class}
          </h4>
        </div>
        <div style={{ margin: "20px", padding: "40px" }}>
          <table style={{ width: "100%", border: "1px solid black" }}>
            <thead>
              <tr>
                <th className="tableHead">Roll</th>
                <th className="tableHead">Name</th>

                {this.state.subjects.map((subject, index) => {
                  return (
                    <th key={index} className="tableHead">
                      {subject === "Handwriting" ? "HW" : subject}
                    </th>
                  );
                })}
                <th className="tableHead">Rank</th>
                <th className="tableHead">Grade</th>
                <th className="tableHead">GPA</th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
          <br></br>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div
            style={{
              float: "right",
              marginRight: "70px",
              marginTop: "50px",
              borderTop: "1px solid black",
              fontWeight: "bold",
            }}
          >
            <h5>Principal</h5>
          </div>
          <div
            style={{
              float: "left",
              marginRight: "70px",
              marginTop: "50px",
              borderTop: "1px solid black",
              fontWeight: "bold",
            }}
          >
            <h5>Class Teacher</h5>
          </div>
        </div>
      </>
    );
  }
}
