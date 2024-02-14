export const sortByField = (array, fieldName, isReversed = false) => {
    const copy = Array.from(array);
    if (fieldName) {
        return copy.sort((a, b) => {
            const fieldA = a[fieldName]?.toLowerCase();
            const fieldB = b[fieldName]?.toLowerCase();
            
            if (fieldA === fieldB) return 0;
            
            if (fieldA > fieldB) return isReversed ? -1 : 1;
            
            return isReversed ? 1 : -1;
        });
    } else {
        const withCompleteDateTime = copy.filter(item => item.completeDateTime);
        const withoutCompleteDateTime = copy.filter(item => !item.completeDateTime);
        
        withCompleteDateTime.sort((a, b) => {
            if (a.completeDateTime > b.completeDateTime) return 1;
            if (a.completeDateTime < b.completeDateTime) return -1;
            return 0;
        });
        
        withoutCompleteDateTime.sort((a, b) => {
            if (a.createDateTime > b.createDateTime) return -1;
            if (a.createDateTime < b.createDateTime) return 1;
            return 0;
        });
        
        return withoutCompleteDateTime.concat(withCompleteDateTime);
    }
};
