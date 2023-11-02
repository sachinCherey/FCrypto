import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Compare from './components/Compare'; // Add this import for the Compare component


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/compare' element={<Compare/>}/>
      </Routes>
    </Router>
  );
}

export default App;
