import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { Zoom, TableHead } from '@material-ui/core';

const filterStyles = theme => ({
  spacer: {
    flex: '1 1 100%'
  },
  textField: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
    width: 150
  }
});

class TableFilters extends React.Component {
  render() {
    const { columns, selectable, open, classes } = this.props;
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
              {columns.map(
                (row, index) => (
                  <TableCell
                    key={row.id}
                    padding={index === 0 && selectable ? 'none' : 'default'}
                  >
                    <TextField className={classes.textField} />
                  </TableCell>
                ),
                this
              )}
            </TableRow>
          </TableHead>
        </Zoom>
      );
    }
    return null;
  }
}

TableFilters.propTypes = {
  selectable: PropTypes.bool
};

export default withStyles(filterStyles)(TableFilters);
