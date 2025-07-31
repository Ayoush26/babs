import { useEffect, useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import gradetoGPA from "../../util/gradetoGPA";
import httpClient from "../../util/httpClient";
import mpg from "../../util/mpg";
import logo from "./../../images/logo.png";
import styles from "./temporaryResult.module.css";
import grade from "../../util/grade";
import graderemarks from "../../util/graderemarks";

export const TemporaryResult = () => {
  const [result, setResult] = useState({
    term: "",
    year: "",
    name: "",
  });

  const slug = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, marksheetRes] = await Promise.all([
          httpClient.get("/settings"),
          httpClient.get(`/marksheet/${slug.search.split("&")[1]}`),
        ]);

        //temporary fix for class 3
        if (slug.search.split("&")[1] === "3") {
          const reorderMarks = (marksData) => {
            const desiredOrder = [
              "Wonder",
              "Nepali",
              "Maths",
              "Science",
              " Samajik",
              "Grammar",
              "GK",
            ];
            const sortedMarks = {};

            desiredOrder.forEach((subject) => {
              if (marksData[subject]) {
                sortedMarks[subject] = marksData[subject];
              }
            });

            return sortedMarks;
          };

          setResult((prev) => ({
            ...settingsRes.data.settings,
            result1: {
              ...marksheetRes.data.data[+slug.search.split("&")[2] - 1],
              marksInfo: reorderMarks(
                marksheetRes.data.data[+slug.search.split("&")[2] - 1].marksInfo
              ),
            },
            result2: {
              ...marksheetRes.data.data[+slug.search.split("&")[2]],
              marksInfo: reorderMarks(
                marksheetRes.data.data[+slug.search.split("&")[2]].marksInfo
              ),
            },
          }));
        } else {
          setResult((prev) => ({
            ...settingsRes.data.settings,
            result1: marksheetRes.data.data[+slug.search.split("&")[2] - 1],
            result2: marksheetRes.data.data[+slug.search.split("&")[2]],
          }));
        }

        //remove temporary fix and then use this instead
        // Update state first
        // setResult((prev) => ({
        //   ...settingsRes.data.settings,
        //   result1: marksheetRes.data.data[+slug.search.split("&")[2] - 1],
        //   result2: marksheetRes.data.data[+slug.search.split("&")[2]],
        // }));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [slug]);

  // Add this effect to handle print after state updates
  useEffect(() => {
    if (result.result1 && result.result2) {
      // Check if data exists
      window.print();
    }
  }, [result]); // Runs when result changes

  const handleGradeMarks = (marksInfo) => {
    if (!marksInfo.test) {
      return {
        obtainedMarks: +marksInfo.exam,
        fullMarks: +marksInfo.fullMarks
      }
    }
    if (+marksInfo.fullMarks === 100) {
      return {
        obtainedMarks: +marksInfo.exam,
        fullMarks: 50
      }
    }
    return {
      obtainedMarks: (+marksInfo.exam) * 2,
      fullMarks: 50
    }
  }

  const mpgCAll = (marksInfo) => {
    const newData = handleGradeMarks(marksInfo)
    return mpg(newData.obtainedMarks, newData.fullMarks).grade
  }

  const mpgCallTest = (marksInfo) => {
    if (!marksInfo.test) return "";
    if (+marksInfo.fullMarks === 100) {
      return mpg(marksInfo.test, 50).grade
    }
    return mpg((+marksInfo.test) * 2, 50).grade
  }

  const remarks = (marksInfo) => {
    const grade = marksInfo.fullMarks === "Grade"
      ? marksInfo.grade
      : mpg(
        +marksInfo.exam + (marksInfo.test ? +marksInfo.test : 0),
        marksInfo.fullMarks
      ).grade;
    return graderemarks(grade)
  }

  const tableBody = (marksInfo, subject, index) => {
    return (
      <>
        <div
          className=" d-flex justify-content-center align-items-center text-center"
          style={{
            width: "6%",
            paddingTop: "3px",
          }}
        >
          {index}
        </div>
        <div
          className=" d-flex pl-5 align-items-center text-center"
          style={{
            width: "48%",
            paddingTop: "3px",
          }}
        >
          {subject}
        </div>
        {/* <div
          className=" d-flex justify-content-center align-items-center text-center"
          style={{
            width: "6%",
            paddingTop: "3px",
          }}
        >
          {marksInfo.fullMarks === "50" ? 2 : 4}
        </div> */}
        <div
          className=" d-flex justify-content-center align-items-center text-center"
          style={{
            width: "8%",
            paddingTop: "3px",
          }}
        >
          {marksInfo.fullMarks === "Grade" ? marksInfo.grade : mpgCAll(marksInfo)}
        </div>
        <div
          className=" d-flex justify-content-center align-items-center text-center"
          style={{
            width: "8%",
            paddingTop: "3px",
          }}
        >
          {marksInfo.fullMarks === "Grade" || mpgCallTest(marksInfo)}
        </div>
        <div
          className=" d-flex justify-content-center align-items-center text-center"
          style={{
            width: "8%",
            paddingTop: "3px",
          }}
        >
          {marksInfo.fullMarks === "Grade"
            ? marksInfo.grade
            : mpg(
              +marksInfo.exam + (marksInfo.test ? +marksInfo.test : 0),
              marksInfo.fullMarks
            ).grade}
        </div>
        <div
          className=" d-flex justify-content-center align-items-center text-center"
          style={{
            width: "8%",
            paddingTop: "3px",
          }}
        >
          {marksInfo.fullMarks === "Grade"
            ? gradetoGPA(marksInfo.grade)
            : mpg(
              +marksInfo.exam + (marksInfo.test ? +marksInfo.test : 0),
              marksInfo.fullMarks
            ).gradePoint}
        </div>
        <div
          className={`d-flex justify-content-center align-items-center text-center ${styles.remarks}`}
          style={{
            width: "13%",
            paddingTop: "3px",
            paddingLeft:"14px"
          }}
        >
          {remarks(marksInfo)}
        </div>
      </>
    );
  };

  const temporaryResultJSX = (arg) => {
    let avgGPA = "";
    if (arg) {
      const subjects = Object.keys(arg.marksInfo);
      let totalGradePoint = 0;
      let totalCredit = 0;
      subjects.forEach((subject) => {
        totalCredit += arg.marksInfo[subject].fullMarks === "50" ? 2 : 4;
        totalGradePoint +=
          arg.marksInfo[subject].fullMarks === "Grade"
            ? +gradetoGPA(arg.marksInfo[subject].grade) * 4
            : +mpg(
              +arg.marksInfo[subject].exam +
              (arg.marksInfo[subject].test
                ? +arg.marksInfo[subject].test
                : 0),
              +arg.marksInfo[subject].fullMarks
            ).gradePoint *
            (arg.marksInfo[subject].fullMarks === "50" ? 2 : 4);
      });
      avgGPA = (totalGradePoint / totalCredit).toFixed(2);
    }
    return (
      <div className={`${styles.wrapper} position-relative`}>
        <div className={`${styles.watermark} d-flex flex-column`}>
          <img src={logo} alt="watermarklogo" />
          <h1
            className={styles.h1}
            style={{
              transform: "scale(2)",
              paddingBottom: "40px",
              opacity: "0.2",
              marginTop: "190px",
            }}
          >
            BUDDHA ADARSHA
          </h1>
          <div
            className="d-flex"
            style={{
              justifyContent: "space-around",
              transform: "scale(2)",
              width: "100%",
              opacity: "0.2",
            }}
          >
            <div style={{ flex: "auto", paddingLeft: "40px" }}>
              <h1 className={styles.h1}>S</h1>
            </div>
            <div style={{ flex: "auto" }}>
              <h1 className={styles.h1}>C</h1>
            </div>
            <div style={{ flex: "auto" }}>
              <h1 className={styles.h1}>H</h1>
            </div>
            <div style={{ flex: "auto" }}>
              <h1 className={styles.h1}>O</h1>
            </div>
            <div style={{ flex: "auto" }}>
              <h1 className={styles.h1}>O</h1>
            </div>
            <div style={{ flex: "auto" }}>
              <h1 className={styles.h1}>L</h1>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={`position-absolute ${styles.logo}`}>
            <img src={logo} alt="logo"></img>
          </div>
          <div className="flex-column">
            <div className="text-center pt-5 pb-5 flex flex-column ">
              <h1 className={styles.h1}>BUDDHA ADARSHA BOARDING SCHOOL</h1>
              <h3 className={`${styles.h3} pb-2`}>
                DIP PATH, DHARAN-9, SUNSARI, NEPAL
              </h3>
            </div>
            <div className="text-center pb-5 flex flex-column ">
              <h2
                className={`${styles.h2} pb-2`}
                style={{ textTransform: "uppercase" }}
              >
                {result.term} EXAMINATION {result.year} BS
              </h2>
              <h1 className={styles.h1}>GRADE-SHEET</h1>
            </div>
            <div className="px-5 pt-2">
              <div className="d-flex mb-4">
                <p className={styles.p}>THE GRADE(S) IS SECURED BY</p>
                <span className={`${styles.span} ml-3`}>{arg?.Name}</span>
              </div>
              <div className="row">
                <div className="d-flex mb-4 col-6">
                  <p className={styles.p}>CLASS</p>
                  <span className={`${styles.span} ml-3`}>{arg?.class}</span>
                </div>
                <div className="d-flex mb-4 col-6">
                  <p className={styles.p}>ROll NO</p>
                  <span className={`${styles.span} ml-3`}>{arg?.Roll}</span>
                </div>
              </div>
              <div className="d-flex mb-4">
                <p className={styles.p}>
                  IN THE TERM EXAM, ClASS-{arg?.class.toUpperCase()} OF
                </p>
                <span className={`${styles.span} mx-3`}>{result.year} BS</span>
                <p className={styles.p}>ARE GIVEN BELOW:</p>
              </div>
            </div>

            {/*Table start*/}
            <div className={`${styles.table} position-relative`}>
              <div className={`${styles.header}`}>
                <div
                  className={`${styles.line} position-absolute d-flex`}
                  style={{ top: "0", left: "6%" }}
                ></div>
                <div
                  className={`${styles.line} position-absolute d-flex`}
                  style={{ top: "0", left: "54%" }}
                ></div>

                <div
                  className={`position-absolute d-flex`}
                  style={{
                    top: "71px",
                    left: "62%",
                    borderLeft: "1px solid black",
                    height: "489px"
                  }}
                ></div>
                <div
                  className={`${styles.line} position-absolute d-flex`}
                  style={{ top: "0", left: "70%" }}
                ></div>
                <div
                  className={`${styles.line} position-absolute d-flex`}
                  style={{ top: "0", left: "78%" }}
                ></div>
                <div
                  className={`${styles.line} position-absolute d-flex`}
                  style={{ top: "0", left: "86%" }}
                ></div>

                {/* header content start*/}
                <div className="d-flex">
                  <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{
                      width: "6%",
                      height: "110px",
                      writingMode: "vertical-rl",
                      transform: "scale(-1)",
                    }}
                  >
                    SERIAL NUMBER
                  </div>
                  <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{
                      width: "48%",
                      height: "110px",
                    }}
                  >
                    SUBJECTS
                  </div>
                  {/* <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{
                      width: "6%",
                      height: "110px",
                      writingMode: "vertical-rl",
                      transform: "scale(-1)",
                    }}
                  >
                    CREDIT HOUR
                  </div> */}
                  <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{
                      width: "16%",
                      height: "110px",
                    }}
                  >
                    <div className="d-flex flex-column w-100">
                      <div style={{ borderBottom: "1px solid black" }}>
                        OBTAINED GRADE
                      </div>
                      <div className="d-flex h-100">
                        <div className="w-50">TH</div>
                        <div className="w-50">IN</div>
                      </div>
                    </div>
                  </div>
                  <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{
                      width: "8%",
                      height: "110px",
                      writingMode: "vertical-rl",
                      transform: "scale(-1)",
                    }}
                  >
                    FINAL GRADE
                  </div>
                  <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{
                      width: "8%",
                      height: "110px",
                      writingMode: "vertical-rl",
                      transform: "scale(-1)",
                    }}
                  >
                    GRADE POINT
                  </div>
                  <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{
                      width: "8%",
                      height: "110px",
                      marginLeft: "23px"
                    }}
                  >
                    REMARKS
                  </div>
                </div>
                {/* header content end*/}

                {/* table content start*/}
                <div className="pt-4">
                  {arg &&
                    Object.keys(arg.marksInfo).map((subject, index) => {
                      return (
                        <Fragment key={subject}>
                          <div className={`${styles.bmFont} d-flex`}>
                            {tableBody(
                              arg.marksInfo[subject],
                              subject,
                              index + 1
                            )}
                          </div>
                        </Fragment>
                      );
                    })}
                </div>
                {/* table content end*/}
              </div>
            </div>
            {/*Table end*/}
            <div className={styles.gradeInfo}>
              <div style={{ paddingLeft: "30px" }}>
                <div className={`${styles.gpa} d-flex align-items-center`}>
                  ATTENDANCE:
                  <div
                    className={`${styles.bmFont} d-flex justify-content-center align-items-center`}
                    style={{ order: "-1", fontWeight: "900" }}
                  >
                    {arg?.attendance ? arg.attendance : "N/A"}
                  </div>
                </div>
              </div>
               <div style={{ paddingLeft: "30px" }}>
                <div className={`${styles.gpa} d-flex align-items-center`}>
                  REMARKS:
                  <div
                    className={`${styles.bmFont} d-flex justify-content-center align-items-center`}
                    style={{ order: "-1", fontWeight: "900" }}
                  >
                    {arg?.attendance ? arg.attendance : "N/A"}
                  </div>
                </div>
              </div>
              <div>
                <div className={`${styles.gpa} d-flex align-items-center`}>
                  GRADE POINT AVERAGE (GPA):
                  <div
                    className={`${styles.bmFont} d-flex justify-content-center align-items-center`}
                    style={{ order: "-1", fontWeight: "900" }}
                  >
                    {avgGPA}
                  </div>
                </div>
                <div
                  className={`${styles.gpa} d-flex align-items-center`}
                  // style={{ marginBottom: "10px"}}
                >
                  RANK:
                  <div
                    className={`${styles.bmFont} d-flex justify-content-center align-items-center `}
                    style={{ order: "-1", fontWeight: "900" }}
                  >
                    {arg?.percentage}%
                  </div>
                </div>
              </div>
            </div>
            <div
              className={` ${styles.sign} row`}
              style={{ marginTop: "70px", marginLeft: "30px" }}
            >
              <div className="col-md-3 bt">
                <p
                  className={`${styles.p} text-center`}
                  style={{ borderTop: "1px solid black", paddingTop: "10px" }}
                >
                  Class Teacher
                </p>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-3 bt">
                <p
                  className={`${styles.p} text-center`}
                  style={{
                    borderTop: "1px solid black",
                    paddingTop: "10px",
                    marginLeft: "8px",
                  }}
                >
                  School's Seal
                </p>
              </div>
              <div className="col-md-1"></div>

              <div className="col-md-3 bt">
                <p
                  className={`${styles.p} text-center`}
                  style={{ borderTop: "1px solid black", paddingTop: "10px" }}
                >
                  Principal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={styles.wrapperMain}
      style={
        result.result2 || {
          width: "50%",
          margin: "auto",
        }
      }
    >
      {temporaryResultJSX(result.result1)}
      {result.result2 && temporaryResultJSX(result.result2)}
    </div>
  );
};
