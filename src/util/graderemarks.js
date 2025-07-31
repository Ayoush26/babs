module.exports = (percentage) => {
  if (percentage ==="D") {
    return "Basic";
  }
  if (percentage==="C") {
    return "Acceptable";
  }
  if (percentage==="C+") {
    return "Satisfactory";
  }
  if (percentage==="B") {
    return "Good";
  }
  if (percentage==="B+") {
    return "Very Good";
  }
  if (percentage ==="A") {
    return "Excellent";
  }
  if (percentage === "A+") {
    return "Outstanding";   
  } else {
    return "Not Graded"; //not graded
  }
};
