import React from "react";
import logo from "./../../images/logo.png";
import styles from "./newResult.module.css";

export const NewResult = () => {
  const tableBody = (
    <>
      <div
        className=" d-flex justify-content-center align-items-center text-center"
        style={{
          width: "6%",
          paddingTop: "3px",
        }}
      >
        1
      </div>
      <div
        className=" d-flex pl-5 align-items-center text-center"
        style={{
          width: "48%",
          paddingTop: "3px",
        }}
      >
        COMP. ENGLISH
      </div>
      <div
        className=" d-flex justify-content-center align-items-center text-center"
        style={{
          width: "6%",
          paddingTop: "3px",
        }}
      >
        4
      </div>
      <div
        className=" d-flex justify-content-center align-items-center text-center"
        style={{
          width: "8%",
          paddingTop: "3px",
        }}
      >
        60
      </div>
      <div
        className=" d-flex justify-content-center align-items-center text-center"
        style={{
          width: "8%",
          paddingTop: "3px",
        }}
      >
        20
      </div>
      <div
        className=" d-flex justify-content-center align-items-center text-center"
        style={{
          width: "8%",
          paddingTop: "3px",
        }}
      >
        A+
      </div>
      <div
        className=" d-flex justify-content-center align-items-center text-center"
        style={{
          width: "8%",
          paddingTop: "3px",
        }}
      >
        3.6
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

  return (
    <div className={`${styles.wrapper} position-relative`}>
      <div className={styles.content}>
        <div className={`position-absolute ${styles.logo}`}>
          <img src={logo} alt="logo"></img>
        </div>
        <div className="flex-column">
          <div className="text-center pt-5 pb-5 flex flex-column ">
            <h4 className="pb-2">DIP PATH, DHARAN-9, SUNSARI, NEPAL</h4>
            <h3>BUDDHA ADARSHA BOARDING SCHOOL</h3>
          </div>
          <div className="text-center pb-5 flex flex-column ">
            <h2 className="pb-2">FINAL TERM EXAMINATION 2078 BS</h2>
            <h1>GRADE-SHEET</h1>
          </div>
          <div className="px-5 pt-2">
            <div className="d-flex mb-4">
              <p>THE GRADE(S) IS SECURED BY</p>
              <span className="ml-3 ">Ayoush Moktan Lama</span>
            </div>
            <div className="row">
              <div className="d-flex mb-4 col-6">
                <p>CLASS</p>
                <span className="ml-3">8</span>
              </div>
              <div className="d-flex mb-4 col-6">
                <p>ROll NO</p>
                <span className="ml-3 ">5</span>
              </div>
            </div>
            <div className="d-flex mb-4">
              <p>IN THE TERMINAL EXAMNATION, GRADE-10 OF</p>
              <span className="mx-3">2076 BS</span>
              <p>ARE GIVEN BELOW:</p>
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
                      <div className="w-50">TH</div>
                      <div className="w-50">PR</div>
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
                <div className={`${styles.bmFont} d-flex`}>{tableBody}</div>
                <div className={`${styles.bmFont} d-flex`}>{tableBody}</div>
                <div className={`${styles.bmFont} d-flex`}>{tableBody}</div>
                <div className={`${styles.bmFont} d-flex`}>{tableBody}</div>
                <div className={`${styles.bmFont} d-flex`}>{tableBody}</div>
                <div className={`${styles.bmFont} d-flex`}>{tableBody}</div>
                <div className={`${styles.bmFont} d-flex`}>{tableBody}</div>
                <div className={`${styles.bmFont} d-flex`}>{tableBody}</div>
                <div className={`${styles.bmFont} d-flex`}>{tableBody}</div>
                <div className={`${styles.bmFont} d-flex`}>{tableBody}</div>
              </div>
              {/* table content end*/}
            </div>
          </div>
          {/*Table end*/}
          <div className={styles.gpa}>
            GRADE POINT AVERAGE (GPA):
            <div
              className={`${styles.bmFont} d-flex justify-content-center align-items-center text-center m-2 mb-2`}
            >
              3.02
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
