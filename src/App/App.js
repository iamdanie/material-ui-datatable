import React, { Component } from 'react';
import DataTable from './components/DataTable/DataTable';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const columns = [
  {
    id: 'name',
    filterable: true,
    filterType: 'text',
    sortable: true,
    label: 'Dessert (100g serving)'
  },
  {
    id: 'calories',
    filterable: true,
    filterType: 'number',
    sortable: true,
    label: 'Cal (g)'
  },
  {
    id: 'state',
    filterable: true,
    filterType: 'multiple',
    sortable: true,
    label: 'State'
  }
];

const data = [
  { id: 1, name: 'Cupcake', calories: 305, state: 'active' },
  { id: 2, name: 'Donut', calories: 329, state: 'inactive' },
  { id: 3, name: 'Yogurt', calories: 120, state: 'active' }
];

const onSelectActions = [
  {
    title: 'Delete',
    ActionIcon: DeleteIcon,
    onClick: () => console.log('trashed')
  }
];

const actions = [
  {
    title: 'Spread love',
    ActionIcon: FavoriteIcon,
    onClick: () => console.log('spread love')
  }
];

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <DataTable
            columns={columns}
            data={data}
            onSelectActions={onSelectActions}
            actions={actions}
            selectable
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
