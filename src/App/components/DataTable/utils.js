const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const sortItems = (array, order, orderBy) => {
  return array.sort((a, b) =>
    order === 'desc' ? desc(a, b, orderBy) : -desc(a, b, orderBy)
  );
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

export { buildFilters, sortItems };
