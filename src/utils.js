export const sortByField = (array, fieldName, isReversed = false) => {
    return array.sort((a, b) => {
        const fieldA = a[fieldName];
        const fieldB = b[fieldName];
        
        if (fieldA > fieldB) {
            return isReversed ? -1 : 1;
        } else if (fieldA < fieldB) {
            return isReversed ? 1 : -1;
        }
        return 0;
    });
};
