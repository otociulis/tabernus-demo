module.exports = {
  adminOnlyAccess: ({ authentication: { item } }) => {
    return typeof item === 'undefined' ? false : item.isAdmin;
  }
};
