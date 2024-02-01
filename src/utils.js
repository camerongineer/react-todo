export const sortByField = (array, fieldName, isReversed = false) => {
    const copy = [...array]
    return copy.sort((a, b) => {
        const fieldA = a[fieldName].toLowerCase();
        const fieldB = b[fieldName].toLowerCase();
        
        if (fieldA > fieldB) {
            return isReversed ? -1 : 1;
        } else if (fieldA < fieldB) {
            return isReversed ? 1 : -1;
        }
        return 0;
    });
};
