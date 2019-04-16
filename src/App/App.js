import React, { Component } from 'react';
import DataTable from './components/DataTable/DataTable';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme();

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
    id: 'fat',
    filterable: true,
    filterType: 'number',
    sortable: true,
    label: 'Fat (g)'
  },
  {
    id: 'carbs',
    filterable: true,
    filterType: 'number',
    sortable: true,
    label: 'Carbs (g)'
  },
  {
    id: 'protein',
    filterable: true,
    filterType: 'number',
    sortable: true,
    label: 'Protein (g)'
  }
];

const data = [
  { id: 1, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { id: 2, name: 'Donut', calories: 329, fat: 1.7, carbs: 200, protein: 8.83 },
  { id: 3, name: 'Yogurt', calories: 120, fat: 8.7, carbs: 549, protein: 12.83 }
];

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
