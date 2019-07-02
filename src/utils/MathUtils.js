

import * as moment from 'moment';

export default {
    average(arrayParam) {
        if (arrayParam && arrayParam.length > 0) {
            return arrayParam.reduce((acc, cur) => { return acc + cur }) / arrayParam.length;
        } else {
            return 0;
        }
    },
    dateDiff(finalDate, initialDate) {
        if (finalDate && initialDate) {
            return moment(finalDate).diff(moment(initialDate), 'minutes')
        } else {
            return 0;
        }
    }
}