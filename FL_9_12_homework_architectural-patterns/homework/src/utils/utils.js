export const getCurrentUsers = (store) => {
    return getFilteredUsers(store).slice(0, store.getState().userNumberToShow);
};

export const getFilteredUsers = (store) => {
    let users = store.getState().users;
    const search = store.getState().search;

    return users.filter((user) => user.name.includes(search));
};