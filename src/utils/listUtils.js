export const buildList = listItems => {
    let id = 0;
    return listItems.map(item => ({ id: ++id, title: item }));
};