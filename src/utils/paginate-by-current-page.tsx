export function paginateByCurrentPage(
  currentPage: number,
  pageNumbers: number[],
  offset: number = 4
) {
  const pageIndex = currentPage - 1;

  const offsetSmallerThan0 = pageIndex - offset < 0;
  const start = offsetSmallerThan0 ? 0 : pageIndex - offset;
  const end = offsetSmallerThan0 ? offset * 2 : pageIndex + offset + 1;
  return {
    isFirstPage: pageIndex === 0,
    isLastPage: pageIndex === pageNumbers.length - 1,
    paginationNumbers: pageNumbers.slice(start, end),
  };
}
