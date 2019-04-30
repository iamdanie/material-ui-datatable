import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TableHeader from './TableHeader';
import TableActions from './TableActions';
import TableFilters from './TableFilters';
import TablePagination from './TablePagination';
import styles from './styles';
import { buildFilters, sortItems, filterByType } from './utils';

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
  const DEFAULT_ROWS_PER_PAGE = 10;
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [filterData, setFilterData] = useState(buildFilters(columns));
  const [tableData, setTableData] = useState(
    sortable ? sortItems(data, 'asc', columns[0].id) : data
  );

  useEffect(() => {
    if (filterable) {
      setTableData(applyFilters(data));
    }
  }, [data, page, rowsPerPage, filterData]);

  const applyFilters = data => {
    return data.filter(row => {
      let conditions = [];
      for (const [column, content] of Object.entries(filterData)) {
        if (
          content.value &&
          (content.value.length || Object.keys(content.value).length)
        ) {
          conditions.push(filterByType(row, column, content));
        }
      }
      return conditions.indexOf(false) === -1;
    });
  };

  const handleRequestSort = (event, property) => {
    let newOrder = 'asc';

    if (orderBy === property && order === 'asc') {
      newOrder = 'desc';
    }

    setOrder(newOrder);
    setOrderBy(property);
    setTableData(sortItems(tableData, newOrder, property));
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
    setFiltersOpen(prevFiltersOpen => {
      if (prevFiltersOpen) {
        setFilterData(buildFilters(columns));
      }
      return !prevFiltersOpen;
    });
  };

  const isSelected = id => selected.indexOf(id) !== -1;

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
          </TableBody>
        </Table>
      </div>
      <TablePagination
        count={data.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[DEFAULT_ROWS_PER_PAGE, 25, 50, 100]}
        currentPage={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

DataTable.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      ActionIcon: PropTypes.func.isRequired
    })
  ),
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      filterable: PropTypes.bool,
      filterType: PropTypes.string,
      sortable: PropTypes.bool
    })
  ),
  data: PropTypes.array.isRequired,
  filterable: PropTypes.bool,
  onSelectActions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      ActionIcon: PropTypes.func.isRequired
    })
  ),
  selectable: PropTypes.bool,
  sortable: PropTypes.bool
};

export default withStyles(styles)(DataTable);
