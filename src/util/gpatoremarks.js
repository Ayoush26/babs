module.exports = (gpa) => {
  if (gpa >= 3.65 && gpa <= 4.0) {
    return "Outstanding"; // A+
  }
  if (gpa >= 3.2 && gpa < 3.65) {
    return "Excellent"; // A
  }
  if (gpa >= 2.8 && gpa < 3.2) {
    return "Very Good"; // B+
  }
  if (gpa >= 2.4 && gpa < 2.8) {
    return "Good"; // B
  }
  if (gpa >= 2.0 && gpa < 2.4) {
    return "Satisfactory"; // C+
  }
  if (gpa >= 1.6 && gpa < 2.0) {
    return "Acceptable"; // C
  }
  if (gpa >= 0.0 && gpa < 1.6) {
    return "Below Average"; // D
  } else {
    return "NG"; // Not Graded (for scores below the minimum GPA or invalid input)
  }
};