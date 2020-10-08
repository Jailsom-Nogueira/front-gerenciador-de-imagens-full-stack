import React from 'react';
import Router from './components/Router';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import dayjs from '@date-io/dayjs';

import { GlobalStorage } from './components/GlobalContext/';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff6d00',
    },
    secondary: {
      main: '#dd2c00',
    },
  },
});

function App() {
  return (
    <MuiPickersUtilsProvider utils={dayjs}>
      <ThemeProvider theme={theme}>
        <GlobalStorage>
          <Router />
        </GlobalStorage>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
