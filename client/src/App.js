import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { jssPreset, StylesProvider, ThemeProvider } from '@material-ui/core';
import { createTheme } from 'src/theme';
import GlobalStyles from 'src/components/GlobalStyles';
import routes from 'src/routes';
import useSettings from 'src/hooks/useSettings';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const App = () => {
  const { settings } = useSettings();
  const routing = useRoutes(routes());

  return (
    <ThemeProvider theme={createTheme(settings)}>
      <GlobalStyles />
      <StylesProvider jss={jss}>{routing}</StylesProvider>
    </ThemeProvider>
  );
};

export default App;
