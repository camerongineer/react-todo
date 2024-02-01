export const sortByField = (array, fieldName, isReversed = false) => {
    const copy = [...array]
    return copy.sort((a, b) => {
        const fieldA = a[fieldName];
        const fieldB = b[fieldName];
        
        if (fieldA.toLowerCase() > fieldB.toLowerCase()) {
            return isReversed ? -1 : 1;
        } else if (fieldA < fieldB) {
            return isReversed ? 1 : -1;
        }
        return 0;
    });
};
