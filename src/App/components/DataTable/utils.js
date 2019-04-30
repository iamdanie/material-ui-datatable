import { format } from 'date-fns';

const defaultFilterValues = {
  text: '',
  number: '',
  multiple: [],
  date: {
    from: format(new Date('1971-01-01'), 'YYYY-MM-DD'),
    to: format(new Date(), 'YYYY-MM-DD')
  }
};

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
        value: defaultFilterValues[column.filterType]
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
    case 'date':
      return handleDateComparison(
        row[columnId],
        column.value.from,
        column.value.to
      );
    default:
      return false;
  }
};

const handleDateComparison = (value, from, to) => {
  const dateValue = Date.parse(value);
  const fromDate = Date.parse(from);
  const toDate = Date.parse(to);

  return (
    (isNaN(fromDate) && isNaN(toDate)) ||
    (dateValue >= fromDate && dateValue <= toDate) ||
    (isNaN(fromDate) && dateValue <= toDate) ||
    (isNaN(toDate) && dateValue >= fromDate)
  );
};

export { buildFilters, filterByType, sortItems };
