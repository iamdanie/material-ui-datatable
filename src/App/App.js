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
    filterOptions: ['active', 'inactive', 'idle'],
    sortable: true,
    label: 'State'
  },
  {
    id: 'added',
    filterable: true,
    filterType: 'date',
    sortable: true,
    label: 'Added'
  }
];

const data = [
  {
    id: 'foo',
    name: 'Cupcake',
    calories: 305,
    state: 'active',
    added: '1997-01-01T12:00:00.000+00:00'
  },
  {
    id: 'bar',
    name: 'Donut',
    calories: 329,
    state: 'inactive',
    added: '2001-01-01T12:00:00.000+00:00'
  },
  {
    id: 'baz',
    name: 'Yogurt',
    calories: 120,
    state: 'active',
    added: '2000-01-01T12:00:00.000+00:00'
  },
  {
    id: 'wee',
    name: 'Donut',
    calories: 180,
    state: 'inactive',
    added: '2000-01-01T12:00:00.000+00:00'
  },
  {
    id: 'abc',
    name: 'Cupcake',
    calories: 305,
    state: 'active',
    added: '2000-01-01T12:00:00.000+00:00'
  },
  {
    id: 'def',
    name: 'Donut',
    calories: 329,
    state: 'inactive',
    added: '2000-01-01T12:00:00.000+00:00'
  },
  {
    id: 'ghi',
    name: 'Yogurt',
    calories: 120,
    state: 'active',
    added: '2000-01-01T12:00:00.000+00:00'
  },
  {
    id: 'jkl',
    name: 'Donut',
    calories: 180,
    state: 'inactive',
    added: '2000-01-01T12:00:00.000+00:00'
  },
  {
    id: 'mno',
    name: 'Cupcake',
    calories: 305,
    state: 'active',
    added: '1999-01-01T12:00:00.000+00:00'
  },
  {
    id: 'prq',
    name: 'Donut',
    calories: 329,
    state: 'inactive',
    added: '1992-01-01T12:00:00.000+00:00'
  },
  {
    id: 'stu',
    name: 'Yogurt',
    calories: 120,
    state: 'active',
    added: '2019-01-01T12:00:00.000+00:00'
  },
  {
    id: 'vwx',
    name: 'Donut',
    calories: 180,
    state: 'inactive',
    added: '2012-01-01T12:00:00.000+00:00'
  },
  {
    id: '123',
    name: 'Yogurt',
    calories: 120,
    state: 'active',
    added: '2000-01-01T12:00:00.000+00:00'
  },
  {
    id: '456',
    name: 'Donut',
    calories: 180,
    state: 'inactive',
    added: '2000-01-01T12:00:00.000+00:00'
  },
  {
    id: '789',
    name: 'Cupcake',
    calories: 305,
    state: 'active',
    added: '1999-01-01T12:00:00.000+00:00'
  },
  {
    id: '012',
    name: 'Donut',
    calories: 329,
    state: 'inactive',
    added: '1992-01-01T12:00:00.000+00:00'
  },
  {
    id: 'yz0',
    name: 'Yogurt',
    calories: 120,
    state: 'active',
    added: '2019-01-01T12:00:00.000+00:00'
  },
  {
    id: 'baa',
    name: 'Donut',
    calories: 180,
    state: 'inactive',
    added: '2012-01-01T12:00:00.000+00:00'
  },
  {
    id: 'bee',
    name: 'Yogurt',
    calories: 120,
    state: 'active',
    added: '2019-01-01T12:00:00.000+00:00'
  },
  {
    id: 'boo',
    name: 'Donut',
    calories: 180,
    state: 'inactive',
    added: '2012-01-01T12:00:00.000+00:00'
  },
  {
    id: 'bff',
    name: 'Donut',
    calories: 180,
    state: 'inactive',
    added: '2012-01-01T12:00:00.000+00:00'
  },
  {
    id: 'dee',
    name: 'Donut',
    calories: 180,
    state: 'inactive',
    added: '2012-01-01T12:00:00.000+00:00'
  }
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
