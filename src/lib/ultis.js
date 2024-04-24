export const getPaginationUI = (total) => {
  let jsxPagination = [];
  let jsxPaginationPrev = [];
  let jsxPaginationNext = [];

  for (let i = 1; i <= (total < 3 ? total : 3); i++) {
    jsxPaginationPrev.push(<button>{i}</button>);
  }
  if (total > 3) {
    for (
      let i = total;
      i > (total > 6 ? total - 3 : total - (5 - total));
      i--
    ) {
      jsxPaginationNext.push(<button>{i}</button>);
    }
  }

  jsxPaginationNext.reverse();
  jsxPagination = [...jsxPagination, ...jsxPaginationPrev];
  jsxPaginationNext.length > 0 && jsxPagination.push(<>....</>);
  jsxPaginationNext.length > 0 &&
    (jsxPagination = [...jsxPagination, ...jsxPaginationNext]);
  return jsxPagination;
};
