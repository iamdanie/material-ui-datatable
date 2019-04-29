import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import styles from './styles';

const TableActions = props => {
  const {
    numSelected,
    classes,
    onSelectActions,
    actions,
    onFilterClick,
    filterable
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
          onSelectActions.map((selectAction, index) => (
            <Tooltip key={index} title={selectAction.title}>
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
              actions.map((action, index) => (
                <Tooltip key={index} title={action.title}>
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
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      ActionIcon: PropTypes.func.isRequired
    })
  ),
  classes: PropTypes.object.isRequired,
  filterable: PropTypes.bool,
  numSelected: PropTypes.number.isRequired,
  onFilterClick: PropTypes.func.isRequired,
  onSelectActions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      ActionIcon: PropTypes.func.isRequired
    })
  )
};

export default withStyles(styles)(TableActions);
