import moment from 'moment';

export const util = {
    formatDate: (date)=>{
        if(!date){
            return;
        }
        return moment(date).format('YYYY/MM/DD');
    },
    formatTime: (date)=>{
        if(!date){
            return;
        }
        return moment(date).format('hh:mm a');
    }
}