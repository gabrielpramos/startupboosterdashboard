
import * as moment from 'moment';

export default {
    dateDiff(finalDate, initialDate) {
        if (finalDate && initialDate) {
            return moment(finalDate).diff(moment(initialDate), 'seconds');
        } else {
            return 0;
        }
    },
    dateDetailedDiff(finalDate, initialDate) {
        if (finalDate && initialDate) {
            const duration = moment.duration(moment(finalDate).diff(moment(initialDate)));
            return {
                years: duration.years(),
                months: duration.months(),
                days: duration.days(),
                hours: duration.hours(),
                minutes: duration.minutes(),
                seconds: duration.seconds(),
            };
        } else {
            return 0;
        }
    },
    humanizeTime(time, timeUnit, singularName, usesShortPresentation) {
        let humanizedTime = '';
        if (time !== undefined && time > 0 && usesShortPresentation === undefined) {
            humanizedTime = `${time}${time > 1 ? timeUnit : singularName}`
        } else if (time > 0 && usesShortPresentation) {
            humanizedTime = `${time}${usesShortPresentation}`;
        }
        return humanizedTime;
    },
}