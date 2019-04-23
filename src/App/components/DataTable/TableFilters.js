import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { Zoom, TableHead } from '@material-ui/core';
import styles from './styles';

const TableFilters = ({ columns, selectable, open, classes }) => {
  if (open) {
    return (
      <Zoom in={open}>
        <TableHead>
          <TableRow>
            {selectable && (
              <TableCell padding="checkbox">
                <div className={classes.spacer} />
              </TableCell>
            )}
            {columns.map((row, index) => (
              <TableCell
                key={row.id}
                padding={index === 0 && selectable ? 'none' : 'default'}
              >
                <TextField className={classes.textFilter} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Zoom>
    );
  }
  return null;
};

TableFilters.propTypes = {
  selectable: PropTypes.bool,
  open: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TableFilters);
