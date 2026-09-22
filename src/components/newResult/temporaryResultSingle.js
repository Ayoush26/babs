import { useEffect } from "react";
import logo from "./../../images/logo.png";
import styles from "./temporaryResult.module.css";
import mpg from "../../util/mpg";
import graderemarks from "../../util/graderemarks";
import gpatoremarks from "../../util/gpatoremarks";
import gradefromgpa from "../../util/gradefromgpa";

// ---- Static exam / school info (edit as needed) ----
const examInfo = {
  term: "FINAL", // shows "FINAL EXAMINATION" (no "TERM" suffix, same rule as before)
  year: "2082",
};

// ---- Static student record (same shape as what the API used to return) ----
// Note: the source document only showed final grades, not raw marks, so the
// exam/test values below were reverse-engineered to land on the exact same
// TH / IN / Final grade, grade point, and GPA (2.97) shown on that sheet.
const student = {
  _id: "6a71de8916f8d0005406b4f6",
  Name: "Surakshya Tigela Limbu",
  Roll: "26",
  class: "4",
  marksInfo: {
    Wonder: { exam: "29", fullMarks: "100", test: "42" },
    Nepali: { exam: "36", fullMarks: "100", test: "40" },
    Maths: { exam: "22", fullMarks: "100", test: "36" },
    Science: { exam: "22", fullMarks: "100", test: "42" },
    Samajik: { exam: "37", fullMarks: "100", test: "41" },
    Grammar: { exam: "38", fullMarks: "100", test: "40" },
    Health: { exam: "13", fullMarks: "50", test: "20" },
    Computer: { exam: "16", fullMarks: "50", test: "18" },
  },
  percentage: 70.29,
  attendance: "53/54",
};
// ------------------------------------------------------

// Compute GPA the same way the original fetch handler did
const computeGPA = (marksInfo) => {
  const subjects = Object.keys(marksInfo);
  let totalGradePoint = 0;
  let totalCredit = 0;

  subjects.forEach((subject) => {
    const info = marksInfo[subject];
    if (info.fullMarks === "Grade") return;
    const credit = info.fullMarks === "50" ? 2 : 4;
    totalCredit += credit;

    const examMarks = +info.exam || 0;
    const testMarks = +info.test || 0;
    const sumMarks = examMarks + testMarks;
    const gradePoint = mpg(sumMarks, +info.fullMarks).gradePoint;
    totalGradePoint += +gradePoint * credit;
  });

  return totalCredit ? +(totalGradePoint / totalCredit).toFixed(2) : 0;
};

student.gpa = computeGPA(student.marksInfo);

export const TemporaryResult = () => {
  // Auto-trigger print once the page renders, same as the original behavior
  useEffect(() => {
    window.print();
  }, []);

  const currentClass = student.class;

  const handleGradeMarks = (marksInfo) => {
    if (!marksInfo.test) {
      return { obtainedMarks: +marksInfo.exam, fullMarks: +marksInfo.fullMarks };
    }
    if (currentClass === "9" || currentClass === "10") {
      return { obtainedMarks: (+marksInfo.exam / 75) * 100, fullMarks: +marksInfo.fullMarks };
    }
    if (+marksInfo.fullMarks === 100) {
      return { obtainedMarks: +marksInfo.exam, fullMarks: 50 };
    }
    return { obtainedMarks: +marksInfo.exam * 2, fullMarks: 50 };
  };

  const mpgCAll = (marksInfo) => {
    const newData = handleGradeMarks(marksInfo);
    return mpg(newData.obtainedMarks, newData.fullMarks).grade;
  };

  const mpgCallTest = (marksInfo) => {
    if (!marksInfo.test) return "";
    if (+marksInfo.fullMarks === 100) {
      if (currentClass === "9" || currentClass === "10") return mpg(+marksInfo.test * 2, 50).grade;
      return mpg(marksInfo.test, 50).grade;
    }
    return mpg(+marksInfo.test * 2, 50).grade;
  };

  const remarks = (marksInfo) => {
    const finalGrade = mpg(
      +marksInfo.exam + (marksInfo.test ? +marksInfo.test : 0),
      marksInfo.fullMarks
    ).grade;
    return graderemarks(finalGrade);
  };

  const tableBody = (marksInfo, subject, index) => {
    return (
      <>
        <div className=" d-flex justify-content-center align-items-center text-center" style={{ width: "6%", paddingTop: "3px" }}>
          {index}
        </div>
        <div className=" d-flex pl-5 align-items-center text-center" style={{ width: "36%", paddingTop: "3px" }}>
          {subject}
        </div>
        <div className=" d-flex justify-content-center align-items-center text-center" style={{ width: "6%", paddingTop: "3px" }}>
          {marksInfo.fullMarks === "50" ? 2 : 4}
        </div>
        <div className=" d-flex justify-content-center align-items-center text-center" style={{ width: "8%", paddingTop: "3px" }}>
          {marksInfo.fullMarks === "Grade" || mpgCAll(marksInfo)}
        </div>
        <div className=" d-flex justify-content-center align-items-center text-center" style={{ width: "8%", paddingTop: "3px" }}>
          {marksInfo.fullMarks === "Grade" || mpgCallTest(marksInfo)}
        </div>
        <div className=" d-flex justify-content-center align-items-center text-center" style={{ width: "8%", paddingTop: "3px" }}>
          {marksInfo.fullMarks === "Grade"
            ? marksInfo.grade
            : mpg(+marksInfo.exam + (marksInfo.test ? +marksInfo.test : 0), marksInfo.fullMarks).grade}
        </div>
        <div className=" d-flex justify-content-center align-items-center text-center" style={{ width: "8%", paddingTop: "3px" }}>
          {marksInfo.fullMarks === "Grade"
            || mpg(+marksInfo.exam + (marksInfo.test ? +marksInfo.test : 0), marksInfo.fullMarks).gradePoint}
        </div>
        <div
          className={`d-flex justify-content-center align-items-center text-center ${styles.remarks}`}
          style={{ width: "18%", paddingTop: "3px", paddingLeft: "15px" }}
        >
          {remarks(marksInfo)}
        </div>
      </>
    );
  };

  return (
    <div className={styles.wrapperMain}>
      <div className={`${styles.wrapper} position-relative`}>
        <div className={`${styles.watermark} d-flex flex-column`}>
          <img src={logo} alt="watermarklogo" />
          <h1
            className={styles.h1}
            style={{ transform: "scale(2)", paddingBottom: "40px", opacity: "0.2", marginTop: "190px" }}
          >
            BUDDHA ADARSHA
          </h1>
        </div>
        <div className={styles.content}>
          <div className={`position-absolute ${styles.logo}`}>
            <img src={logo} alt="logo"></img>
          </div>
          <div className="flex-column">
            <div className="text-center pt-5 pb-5 flex flex-column ">
              <h1 className={styles.h1}>BUDDHA ADARSHA BOARDING SCHOOL</h1>
              <h3 className={`${styles.h3} pb-2`}>DIP PATH, DHARAN-9, SUNSARI, NEPAL</h3>
            </div>
            <div className="text-center pb-5 flex flex-column ">
              <h2 className={`${styles.h2} pb-2`} style={{ textTransform: "uppercase" }}>
                {examInfo.term} {examInfo.term.toUpperCase() === "FINAL" ? "" : "TERM"} EXAMINATION {examInfo.year} BS
              </h2>
              <h1 className={styles.h1}>GRADE-SHEET</h1>
            </div>
            <div className="px-5 pt-2">
              <div className="d-flex mb-4">
                <p className={styles.p}>THE GRADE(S) IS SECURED BY</p>
                <span className={`${styles.span} ml-3`}>{student.Name}</span>
              </div>
              <div className="row">
                <div className="d-flex mb-4 col-6">
                  <p className={styles.p}>CLASS</p>
                  <span className={`${styles.span} ml-3`}>{student.class}</span>
                </div>
                <div className="d-flex mb-4 col-6">
                  <p className={styles.p}>ROll NO</p>
                  <span className={`${styles.span} ml-3`}>{student.Roll}</span>
                </div>
              </div>
              <div className="d-flex mb-4">
                <p className={styles.p}>IN THE TERM EXAM, ClASS-{student.class.toUpperCase()} OF</p>
                <span className={`${styles.span} mx-3`}>{examInfo.year} BS</span>
                <p className={styles.p}>ARE GIVEN BELOW:</p>
              </div>
            </div>

            {/*Table start*/}
            <div className={`${styles.table} position-relative`}>
              <div className={`${styles.header}`}>
                <div className={`${styles.line} position-absolute d-flex`} style={{ top: "0", left: "6%" }}></div>
                <div className={`${styles.line} position-absolute d-flex`} style={{ top: "0", left: "41.5%" }}></div>
                <div className={`${styles.line} position-absolute d-flex`} style={{ top: "0", left: "48%" }}></div>
                <div
                  className={`position-absolute d-flex`}
                  style={{ top: "71px", left: "56%", borderLeft: "1px solid black", height: "489px" }}
                ></div>
                <div className={`${styles.line} position-absolute d-flex`} style={{ top: "0", left: "64%" }}></div>
                <div className={`${styles.line} position-absolute d-flex`} style={{ top: "0", left: "72%" }}></div>
                <div className={`${styles.line} position-absolute d-flex`} style={{ top: "0", left: "80%" }}></div>

                {/* header content start*/}
                <div className="d-flex">
                  <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{ width: "6%", height: "110px", writingMode: "vertical-rl", transform: "scale(-1)" }}
                  >
                    SERIAL NUMBER
                  </div>
                  <div className=" d-flex justify-content-center align-items-center text-center" style={{ width: "36%", height: "110px" }}>
                    SUBJECTS
                  </div>
                  <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{ width: "6%", height: "110px", writingMode: "vertical-rl", transform: "scale(-1)" }}
                  >
                    CREDIT HOUR
                  </div>
                  <div className=" d-flex justify-content-center align-items-center text-center" style={{ width: "16%", height: "110px" }}>
                    <div className="d-flex flex-column w-100">
                      <div style={{ borderBottom: "1px solid black" }}>OBTAINED GRADE</div>
                      <div className="d-flex h-100">
                        <div className="w-50">TH</div>
                        <div className="w-50">IN</div>
                      </div>
                    </div>
                  </div>
                  <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{ width: "8%", height: "110px", writingMode: "vertical-rl", transform: "scale(-1)" }}
                  >
                    FINAL GRADE
                  </div>
                  <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{ width: "8%", height: "110px", writingMode: "vertical-rl", transform: "scale(-1)" }}
                  >
                    GRADE POINT
                  </div>
                  <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{ width: "8%", height: "110px", marginLeft: "44px" }}
                  >
                    REMARKS
                  </div>
                </div>
                {/* header content end*/}

                {/* table content start*/}
                <div className="pt-4">
                  {Object.keys(student.marksInfo).map((subject, index) => (
                    <div className={`${styles.bmFont} d-flex`} key={subject}>
                      {tableBody(student.marksInfo[subject], subject, index + 1)}
                    </div>
                  ))}
                </div>
                {/* table content end*/}
              </div>
            </div>
            {/*Table end*/}
            <div className={styles.gradeInfo}>
              <div style={{ paddingLeft: "10px" }}>
                <div className={`${styles.gpa} d-flex align-items-center`}>
                  ATTENDANCE:
                  <div
                    className={`${styles.bmFont} d-flex justify-content-center align-items-center`}
                    style={{ order: "-1", fontWeight: "900" }}
                  >
                    {student.attendance ? student.attendance : "N/A"}
                  </div>
                </div>
              </div>
              <div style={{ paddingLeft: "10px" }}>
                <div className={`${styles.gpa} d-flex align-items-center`}>
                  REMARKS:
                  <div
                    className={`${styles.remarks} d-flex justify-content-center align-items-center `}
                    style={{ order: "-1", fontWeight: "900", fontSize: "1.22rem", paddingTop: "0.1rem", flexWrap: "nowrap", whiteSpace: "nowrap" }}
                  >
                    {gpatoremarks(student.gpa).toUpperCase()}
                  </div>
                </div>
              </div>
              <div>
                <div className={`${styles.gpa} d-flex align-items-center`} style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }}>
                  GRADE POINT AVERAGE:
                  <div
                    className={`${styles.bmFont} d-flex justify-content-center align-items-center`}
                    style={{ order: "-1", fontWeight: "900", flexWrap: "nowrap", whiteSpace: "nowrap" }}
                  >
                    {student.gpa} ({gradefromgpa(+student.gpa)})
                  </div>
                </div>
              </div>
            </div>
            <div className={` ${styles.sign} row`} style={{ marginTop: "120px", marginLeft: "30px" }}>
              <div className="col-md-3 bt">
                <p className={`${styles.p} text-center`} style={{ borderTop: "1px solid black", paddingTop: "10px", fontSize: "20px" }}>
                  Class Teacher
                </p>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-3 bt">
                <p
                  className={`${styles.p} text-center`}
                  style={{ borderTop: "1px solid black", paddingTop: "10px", marginRight: "5px", fontSize: "20px" }}
                >
                  School's Seal
                </p>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-3 bt">
                <p
                  className={`${styles.p} text-center`}
                  style={{ borderTop: "1px solid black", paddingTop: "10px", fontSize: "20px", marginRight: "40px" }}
                >
                  Principal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
