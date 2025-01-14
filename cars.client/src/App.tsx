import { Box } from '@mui/material';
import './App.css';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Registrations from './components/Registrations';

function App() {
  return (
    <Box sx={{ width: "1280px" }}>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/registration"} element={<Registrations />} />
      </Routes>
    </Box>
  );
}

export default App;