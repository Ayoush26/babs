import { useEffect, useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import gradetoGPA from "../../util/gradetoGPA";
import httpClient from "../../util/httpClient";
import mpg from "../../util/mpg";
import logo from "./../../images/logo.png";
import styles from "./temporaryResult.module.css";

export const TemporaryResult = () => {
  const [result, setResult] = useState({
    term: "",
    year: "",
    name: "",
  });

  const slug = useLocation();

  console.log(result);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Promise.all([
        httpClient.get("/settings"),
        httpClient.get(`/marksheet/${slug.search.split("&")[1]}`),
      ]);
      setResult((prev) => ({
        ...res[0].data.settings,
        result1: res[1].data.data[+slug.search.split("&")[2] - 1],
        result2: res[1].data.data[+slug.search.split("&")[2]],
      }));
      window.print();
    };

    fetchData();
  }, [slug]);

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
        <div
          className=" d-flex justify-content-center align-items-center text-center"
          style={{
            width: "6%",
            paddingTop: "3px",
          }}
        >
          {marksInfo.fullMarks === "50" ? 2 : 4}
        </div>
        <div
          className=" d-flex justify-content-center align-items-center text-center"
          style={{
            width: "8%",
            paddingTop: "3px",
          }}
        >
          {marksInfo.fullMarks === "Grade" || marksInfo.exam}
        </div>
        <div
          className=" d-flex justify-content-center align-items-center text-center"
          style={{
            width: "8%",
            paddingTop: "3px",
          }}
        >
          {marksInfo.fullMarks === "Grade" || marksInfo.test}
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
          className=" d-flex justify-content-center align-items-center text-center"
          style={{
            width: "8%",
            paddingTop: "3px",
          }}
        ></div>
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
                {result.term} TERM EXAMINATION {result.year} BS
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
                <span className={`${styles.span} mx-3`}>2076 BS</span>
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
                  className={`${styles.line} position-absolute d-flex`}
                  style={{ top: "0", left: "60%" }}
                ></div>
                <div
                  className={`position-absolute d-flex`}
                  style={{
                    top: "55px",
                    left: "68%",
                    borderLeft: "1px solid black",
                    height: "504px",
                  }}
                ></div>
                <div
                  className={`${styles.line} position-absolute d-flex`}
                  style={{ top: "0", left: "76%" }}
                ></div>
                <div
                  className={`${styles.line} position-absolute d-flex`}
                  style={{ top: "0", left: "84%" }}
                ></div>
                <div
                  className={`${styles.line} position-absolute d-flex`}
                  style={{ top: "0", left: "92%" }}
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
                  <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{
                      width: "6%",
                      height: "110px",
                      writingMode: "vertical-rl",
                      transform: "scale(-1)",
                    }}
                  >
                    CREDIT HOUR
                  </div>
                  <div
                    className=" d-flex justify-content-center align-items-center text-center"
                    style={{
                      width: "16%",
                      height: "110px",
                    }}
                  >
                    <div className="d-flex flex-column w-100">
                      <div style={{ borderBottom: "1px solid black" }}>
                        OBTAINED MARKS
                      </div>
                      <div className="d-flex h-100">
                        <div className="w-50">EX</div>
                        <div className="w-50">UT</div>
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
                      writingMode: "vertical-rl",
                      transform: "scale(-1)",
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
              style={{ marginBottom: "48px" }}
            >
              PERCENTAGE:
              <div
                className={`${styles.bmFont} d-flex justify-content-center align-items-center `}
                style={{ order: "-1", fontWeight: "900" }}
              >
                {arg?.percentage}
              </div>
            </div>
            <div
              className={` ${styles.sign} row`}
              style={{ marginTop: "110px", marginLeft: "30px" }}
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
