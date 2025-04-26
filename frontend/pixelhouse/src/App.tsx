import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Supplier } from './screens/Supplier';
import { Home } from './screens/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/supplier" element={<Supplier />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;