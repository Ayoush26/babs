module.exports = (obtainedMarks, fullMarks)=>{
    var result,gradePoint,grade;
    var obtainedMarks = Number(obtainedMarks);
    var fullMarks = Number(fullMarks);
    if(fullMarks===100){
        if(obtainedMarks<=100 && obtainedMarks>=91){
            gradePoint = '4.0';
            grade = 'A+'
        }
        if(obtainedMarks<=90 && obtainedMarks>=81){
            gradePoint = '3.6';
            grade = 'A'
        }
        if(obtainedMarks<=80 && obtainedMarks>=71){
            gradePoint = '3.2';
            grade = 'B+'
        }
        if(obtainedMarks<=70 && obtainedMarks>=61){
            gradePoint = '2.8';
            grade = 'B'
        }
        if(obtainedMarks<=60 && obtainedMarks>=51){
            gradePoint = '2.4';
            grade = 'C+'
        }
        if(obtainedMarks<=50 && obtainedMarks>=41){
            gradePoint = '2.0';
            grade = 'C'
        }
        if(obtainedMarks<=40 && obtainedMarks>=31){
            gradePoint = '1.6';
            grade = 'D+'
        }
        if(obtainedMarks<=30){
            gradePoint ='1.2';
            grade = 'D'
        }
        
    }
    else{  
        if(obtainedMarks<=50 && obtainedMarks>=46){
            gradePoint = '4.0';
            grade = 'A+'
        }
        if(obtainedMarks<=45 && obtainedMarks>=41){
            gradePoint = '3.6';
            grade = 'A'
        }
        if(obtainedMarks<=40 && obtainedMarks>=36){
            gradePoint = '3.2';
            grade = 'B+'
        }
        if(obtainedMarks<=35 && obtainedMarks>=31){
            gradePoint = '2.8';
            grade = 'B'
        }
        if(obtainedMarks<=30 && obtainedMarks>=26){
            gradePoint = '2.4';
            grade = 'C+'
        }
        if(obtainedMarks<=25 && obtainedMarks>=21){
            gradePoint = '2.0';
            grade = 'C'
        }
        if(obtainedMarks<=20 && obtainedMarks>=16){
            gradePoint = '1.6';
            grade = 'D+'
        }
        if(obtainedMarks<=15){
            gradePoint ='1.2';
            grade = 'D'
        }
    }
    result = {
        obtainedMarks,
        gradePoint,
        grade
    }
    return result;
}