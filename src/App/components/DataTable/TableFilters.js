import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

const filterStyles = theme => ({
  spacer: {
    flex: '1 1 100%'
  },
  textField: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
    width: 200
  }
});

class TableFilters extends React.Component {
  render() {
    const { columns, selectable, open, classes } = this.props;
    if (open) {
      return (
        <TableHead>
          <TableRow>
            {selectable && (
              <TableCell padding="checkbox">
                <div className={classes.spacer} />
              </TableCell>
            )}
            {columns.map(
              row => (
                <TableCell key={row.id} align={'left'} padding={'none'}>
                  <TextField
                    id="standard-with-placeholder"
                    className={classes.textField}
                  />
                </TableCell>
              ),
              this
            )}
          </TableRow>
        </TableHead>
      );
    }
    return null;
  }
}

TableFilters.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  selectable: PropTypes.bool
};

export default withStyles(filterStyles)(TableFilters);
