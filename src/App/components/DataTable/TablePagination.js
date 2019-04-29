import React from 'react';
import PropTypes from 'prop-types';
import {
  TablePagination as MuiTablePagination,
  IconButton,
  withStyles
} from '@material-ui/core';
import {
  LastPage,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@material-ui/icons';
import styles from './styles';

const TablePagination = ({
  classes,
  count,
  rowsPerPage,
  rowsPerPageOptions,
  currentPage,
  onChangePage,
  onChangeRowsPerPage
}) => {
  return (
    <MuiTablePagination
      component="div"
      classes={{ select: classes.select }}
      colSpan={3}
      count={count}
      page={currentPage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      SelectProps={{
        native: true,
        inputProps: {}
      }}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      ActionsComponent={TablePaginationActionsWrapped}
    />
  );
};

export default withStyles({ select: { paddingRight: 25 } })(TablePagination);

const TablePaginationActions = ({
  page,
  count,
  rowsPerPage,
  onChangePage,
  classes
}) => {
  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.pagination}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        <LastPage />
      </IconButton>
    </div>
  );
};

TablePagination.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired
};

const TablePaginationActionsWrapped = withStyles(styles)(
  TablePaginationActions
);
