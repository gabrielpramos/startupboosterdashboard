
export default {
    average = arrayParam => {
        return arrayParam.reduce((acc, cur) => {
            return acc + cur
        }) / arrayParam.length;
    }
}