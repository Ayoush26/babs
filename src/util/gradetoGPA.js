module.exports= (grade)=>{
    if(grade==='A+'){
        return '4.0'
    }
    if(grade==='A'){
        return '3.6'
    }
    if(grade==='B+'){
        return '3.2'
    }
    if(grade==='B'){
        return '2.8'
    }
    if(grade==='C+'){
        return '2.4'
    }
    if(grade==='C'){
        return '2.0'
    }
    if(grade==='D+'){
        return '1.6'
    }
    if(grade==='D'){
        return '1.2'
    }
    return
}