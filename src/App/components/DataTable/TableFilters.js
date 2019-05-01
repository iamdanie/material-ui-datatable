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

const TableFilters = ({
  columns,
  selectable,
  open,
  filterData,
  setFilterData,
  classes
}) => {
  const handleFilterChange = column => {
    return event => {
      const newValue = event.target.value;
      setFilterData(prevData => ({
        ...prevData,
        ...{ [column]: { ...prevData[column], ...{ value: newValue } } }
      }));
    };
  };

  const handleDateChange = (column, range) => {
    return event => {
      const newValue = event.target.value;
      setFilterData(prevData => ({
        ...prevData,
        ...{
          [column]: {
            ...prevData[column],
            ...{
              value: { ...prevData[column].value, ...{ [range]: newValue } }
            }
          }
        }
      }));
    };
  };

  const handleChipDelete = (column, newValue) => {
    return () => {
      setFilterData(prevData => ({
        ...prevData,
        ...{
          [column]: {
            ...prevData[column],
            ...{
              value: prevData[column].value.filter(item => item !== newValue)
            }
          }
        }
      }));
    };
  };

  const handleFilterTypes = column => {
    switch (column.filterType) {
      case 'text':
        return (
          <TextField
            className={classes.textFilter}
            value={filterData[column.id].value}
            onChange={handleFilterChange(column.id)}
          />
        );
      case 'number':
        return (
          <TextField
            type="number"
            value={filterData[column.id].value}
            onChange={handleFilterChange(column.id)}
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
            value={filterData[column.id].value}
            onChange={handleFilterChange(column.id)}
            input={
              <Input id="select-multiple-chip" className={classes.textFilter} />
            }
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip
                    key={value}
                    label={value}
                    className={classes.chip}
                    onDelete={handleChipDelete(column.id, value)}
                  />
                ))}
              </div>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250
                }
              }
            }}
          >
            {column.filterOptions &&
              column.filterOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
          </Select>
        );
      case 'date':
        return (
          <div>
            <TextField
              type="date"
              id="offset"
              label="From"
              name="offset"
              value={filterData[column.id].value.from}
              className={classes.dateFilter}
              onChange={handleDateChange(column.id, 'from')}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              type="date"
              id="offset_to"
              label="To"
              name="offset"
              value={filterData[column.id].value.to}
              className={classes.dateFilter}
              onChange={handleDateChange(column.id, 'to')}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
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
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      filterable: PropTypes.bool,
      filterType: PropTypes.string,
      sortable: PropTypes.bool
    })
  ).isRequired,
  classes: PropTypes.object.isRequired,
  filterData: PropTypes.object,
  open: PropTypes.bool,
  selectable: PropTypes.bool,
  setFilterData: PropTypes.func
};

export default withStyles(styles)(TableFilters);
