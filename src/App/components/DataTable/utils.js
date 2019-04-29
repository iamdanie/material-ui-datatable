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

const filterByType = (row, columnId, column) => {
  switch (column.filterType) {
    case 'text':
      return row[columnId].toLowerCase().search(column.value) !== -1;
    case 'number':
      return row[columnId] === parseFloat(column.value);
    case 'multiple':
      return column.value.indexOf(row[columnId]) !== -1;
    default:
      return false;
  }
};

export { buildFilters, filterByType, sortItems };
