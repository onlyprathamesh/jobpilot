function addBusinessDays(date, days) {
    const result = new Date(date);
    let addDays = 0;

    while (addDays < days) {
        result.setDate(result.getDate()+1);
        const day = result.getDay();

        if (day != 0 && day != 6) {
            addDays++;
        }
    }
    return result;
};

module.exports = {addBusinessDays};