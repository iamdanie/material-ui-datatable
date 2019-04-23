import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import {
  Zoom,
  TableHead,
  Select,
  Input,
  Chip,
  MenuItem
} from '@material-ui/core';
import styles from './styles';

const TableFilters = ({ columns, selectable, open, classes }) => {
  const handleFilterTypes = column => {
    switch (column.filterType) {
      case 'text':
        return <TextField className={classes.textFilter} />;
      case 'number':
        return (
          <TextField
            type="number"
            className={classes.textFilter}
            InputLabelProps={{
              shrink: true
            }}
          />
        );
      case 'multiple':
        return (
          <Select
            multiple
            value={[]}
            input={
              <Input id="select-multiple-chip" className={classes.textFilter} />
            }
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 250
                }
              }
            }}
          >
            <MenuItem value="">None</MenuItem>
            {column.filterOptions &&
              column.filterOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
          </Select>
        );
      default:
        return null;
    }
  };

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
            {columns.map((column, index) => (
              <TableCell
                key={column.id}
                padding={index === 0 && selectable ? 'none' : 'default'}
              >
                {handleFilterTypes(column)}
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
