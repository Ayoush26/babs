module.exports = (percentage)=>{
    if(percentage>0&&percentage<=20){
        return 'E'
    }
    if(percentage>20&&percentage<=30){
        return 'D'
    }
    if(percentage>30&&percentage<=40){
        return 'D+'
    }
    if(percentage>40&&percentage<=50){
        return 'C'
    }
    if(percentage>50&&percentage<=60){
        return 'C+'
    }
    if(percentage>60&&percentage<=70){
        return 'B'
    }
    if(percentage>70&&percentage<=80){
        return 'B+'
    }
    if(percentage>80&&percentage<=90){
        return 'A'
    }
    if(percentage>90&&percentage<=100){
        return 'A+'
    }

    else{
        return 'unknown'
    }    
    
}