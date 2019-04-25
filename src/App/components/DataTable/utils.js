const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
};

const buildFilters = columns => {
  let filters = {};
  for (const column of columns) {
    if (column.filterable) {
      filters[column.id] = {
        filterType: column.filterType,
        value: column.filterType === 'multiple' ? [] : ''
      };
    }
  }

  return filters;
};

export { buildFilters, getSorting, stableSort };
