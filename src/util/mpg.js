module.exports = (obtainedMarks, fullMarks) => {
  var result, gradePoint, grade;

  if(!obtainedMarks) return {
    grade:''
  };
  var obtainedMarks = Number(obtainedMarks);
  var fullMarks = Number(fullMarks);
  if (fullMarks === 100) {
    if (obtainedMarks <= 100 && obtainedMarks >= 90) {
      gradePoint = "4.0";
      grade = "A+";
    }
    if (obtainedMarks < 90 && obtainedMarks >= 80) {
      gradePoint = "3.6";
      grade = "A";
    }
    if (obtainedMarks < 80 && obtainedMarks >= 70) {
      gradePoint = "3.2";
      grade = "B+";
    }
    if (obtainedMarks < 70 && obtainedMarks >= 60) {
      gradePoint = "2.8";
      grade = "B";
    }
    if (obtainedMarks < 60 && obtainedMarks >= 50) {
      gradePoint = "2.4";
      grade = "C+";
    }
    if (obtainedMarks < 50 && obtainedMarks >= 40) {
      gradePoint = "2.0";
      grade = "C";
    }
    if (obtainedMarks < 40) {
      gradePoint = "1.6";
      grade = "D";
    }
  } else {
    if (obtainedMarks <= 50 && obtainedMarks >= 45) {
      gradePoint = "4.0";
      grade = "A+";
    }
    if (obtainedMarks < 45 && obtainedMarks >= 40) {
      gradePoint = "3.6";
      grade = "A";
    }
    if (obtainedMarks < 40 && obtainedMarks >= 35) {
      gradePoint = "3.2";
      grade = "B+";
    }
    if (obtainedMarks < 35 && obtainedMarks >= 30) {
      gradePoint = "2.8";
      grade = "B";
    }
    if (obtainedMarks < 30 && obtainedMarks >= 25) {
      gradePoint = "2.4";
      grade = "C+";
    }
    if (obtainedMarks < 25 && obtainedMarks >= 20) {
      gradePoint = "2.0";
      grade = "C";
    }
    if (obtainedMarks < 20 ) {
      gradePoint = "1.6";
      grade = "D";
    }
  }
  result = {
    obtainedMarks,
    gradePoint,
    grade,
  };
  return result;
};
