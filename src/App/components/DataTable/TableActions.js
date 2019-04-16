import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
});

const TableActions = props => {
  const {
    numSelected,
    classes,
    onSelectActions,
    actions,
    onFilterClick,
    filterable = true
  } = props;

  return (
    <Toolbar>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Nutrition
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          onSelectActions &&
          onSelectActions.map(selectAction => (
            <Tooltip title={selectAction.title}>
              <IconButton
                aria-label={selectAction.title}
                onClick={selectAction.onClick}
              >
                <selectAction.ActionIcon />
              </IconButton>
            </Tooltip>
          ))
        ) : (
          <div style={{ display: 'flex' }}>
            {filterable && (
              <Tooltip title={'Filter list'}>
                <IconButton aria-label={'Filter list'} onClick={onFilterClick}>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            )}

            {actions &&
              actions.map(action => (
                <Tooltip title={action.title}>
                  <IconButton
                    aria-label={action.title}
                    onClick={action.onClick}
                  >
                    <action.ActionIcon />
                  </IconButton>
                </Tooltip>
              ))}
          </div>
        )}
      </div>
    </Toolbar>
  );
};

TableActions.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

export default withStyles(toolbarStyles)(TableActions);
