const paginationHelpers = (query, ObjectPage, countRecord) => {
  if (query.page) {
    ObjectPage.currentPage = parseInt(query.page);
    ObjectPage.skipPage = (ObjectPage.currentPage - 1) * ObjectPage.limitPage;
  }
  if (query.limit) {
    ObjectPage.limitPage = parseInt(query.limit);
    ObjectPage.skipPage = (ObjectPage.currentPage - 1) * ObjectPage.limitPage;
  }
  const totalPages = Math.ceil(countRecord / ObjectPage.limitPage);
  ObjectPage.totalPages = totalPages;
  return ObjectPage;
};
module.exports = { paginationHelpers };
