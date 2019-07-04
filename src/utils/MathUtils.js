
export default {
    average(arrayParam) {
        if (arrayParam && arrayParam.length > 0) {
            return arrayParam.reduce((acc, cur) => { return acc + cur }) / arrayParam.length;
        } else {
            return 0;
        }
    },    
}