import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TableHeader from './TableHeader';
import TableActions from './TableActions';
import TableFilters from './TableFilters';
import styles from './styles';
import { stableSort, getSorting } from './utils';

const buildFilters = columns => {
  let filters = {};
  for (const column of columns) {
    if (column.filterable) {
      filters[column.id] = column.filterType === 'multiple' ? [] : '';
    }
  }

  return filters;
};

const DataTable = ({
  classes,
  columns,
  data,
  selectable,
  sortable = true,
  onSelectActions,
  actions,
  filterable = true
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [filterData, setFilterData] = useState(buildFilters(columns));
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(prevData => stableSort(prevData, getSorting(order, orderBy)));
  }, [data, order, orderBy, page, rowsPerPage]);

  useEffect(() => {
    setTableData(prevData => applyFilters(prevData));
  }, [data, page, rowsPerPage, filterData]);

  const applyFilters = tableData => {
    return tableData;
  };

  const handleRequestSort = (event, property) => {
    let newOrder = 'desc';

    if (orderBy === property && order === 'desc') {
      newOrder = 'asc';
    }

    setOrder(newOrder);
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      setSelected(data.map(n => n.id));
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const newSelected =
      selected.indexOf(id) === -1
        ? [...selected, ...[id]]
        : selected.filter(value => value !== id);

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleFiltersState = () => {
    setFiltersOpen(prevFiltersOpen => !prevFiltersOpen);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <Paper className={classes.root}>
      <TableActions
        numSelected={selected.length}
        filterable={filterable}
        onSelectActions={onSelectActions}
        actions={actions}
        onFilterClick={handleFiltersState}
      />
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
          <TableHeader
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            columns={columns}
            selectable={selectable}
            sortable={sortable}
          />
          <TableFilters
            columns={columns}
            filterData={filterData}
            setFilterData={setFilterData}
            selectable={selectable}
            open={filtersOpen}
          />
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                const selected = isSelected(row.id);
                return (
                  <TableRow
                    hover
                    onClick={
                      selectable && (event => handleClick(event, row.id))
                    }
                    role="checkbox"
                    aria-checked={selectable && selected}
                    tabIndex={-1}
                    key={row.id}
                    selected={selectable && selected}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox checked={selected} />
                      </TableCell>
                    )}
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
                        align="left"
                        padding={selectable && index === 0 ? 'none' : 'default'}
                      >
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[3]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  selectable: PropTypes.bool
};

export default withStyles(styles)(DataTable);
