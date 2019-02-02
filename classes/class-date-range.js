'use strict';

const moment = require('moment');

class DateRange {
    constructor(date) {
        this.date = (typeof date === 'string') ? moment(date) : date;
        this.setLocale('pt-br');
    }

    getDays(n){
        return this.getNow().add(n, 'days');
    }

    getDate() {
        return this.date;
    }

    getDatePretty(pattern = 'DD/MM/YYYY') {
        return this.getDate().format(pattern);
    }

    walkDate(n) {
        let mDateStep = this.date.clone().add(n,'days');
        let mDateStepWK = mDateStep.isoWeekday();
        let arr = [mDateStep,mDateStepWK,this.date.isoWeekday()];
       
        return arr;
    }

    extendWeek(n, limit=null) {
        
        let step = n < 0 ? -1 : 1;

        let arrStep = this.walkDate(n);
        let dateStep = arrStep[0];
        
        let dateStepWK = arrStep[1];
        let dateWK = arrStep[2];
        
        //corrige para o mesmo dia da semana
        while(dateStepWK != dateWK) {
            dateStep.add(step,'days');
            dateStepWK = dateStep.isoWeekday();
        }
        return [dateStep,dateStepWK];
    }


    setLocale (locale) {
        moment.locale(locale);
    }

    getNow () {
        return moment();
    };
    
}

module.exports = DateRange;