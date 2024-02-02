export const sortByField = (array, fieldName, isReversed = false) => {
    const copy = Array.from(array)
    return copy.sort((a, b) => {
        const fieldA = a[fieldName].toLowerCase();
        const fieldB = b[fieldName].toLowerCase();
        
        if (fieldA === fieldB) return 0;
        
        if (fieldA > fieldB) return isReversed ? -1 : 1;
        
        return isReversed ? 1 : -1;
    });
};
