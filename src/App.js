import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home.js';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Clubs from './components/pages/Clubs.js';
import Events from './components/pages/Events.js';
import AboutUs from './components/pages/AboutUs.js';
import Organize from './components/pages/Organize.js';
import Login from './components/pages/Login';
// import { Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
        <Route path='/' exact element={<Home/>} />
          <Route path='/Clubs' element={<Clubs/>} />
          <Route path='/Events' element={<Events/>} />
          <Route path='/AboutUs' element={<AboutUs/>} />
          <Route path='/Organize' element={<Organize/>}/>  
          <Route path='/Login' element={<Login/>}/> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
