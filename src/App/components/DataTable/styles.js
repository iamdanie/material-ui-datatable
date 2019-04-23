const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  spacer: {
    flex: '1 1 100%'
  },
  textFilter: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
    width: 150
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
});

export default styles;
