module.exports = (gpa) => {
  if (gpa >3.6) {
    return "A+"; // Outstanding
  }
  if (gpa > 3.2 && gpa <= 3.6) {
    return "A"; // Excellent
  }
  if (gpa > 2.8 && gpa <= 3.2) {
    return "B+"; // Very Good
  }
  if (gpa > 2.4 && gpa <= 2.8) {
    return "B"; // Good
  }
  if (gpa > 2.0 && gpa <= 2.4) {
    return "C+"; // Satisfactory
  }
  if (gpa > 1.6 && gpa <= 2.0) {
    return "C"; // Acceptable
  }
  if (gpa >= 0 && gpa <= 1.6) {
    return "D"; // Partially Acceptable
  }
  return "NG"; // Not Graded (for negative GPA or invalid input)
};
