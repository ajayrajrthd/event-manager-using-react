import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home.js';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Clubs from './components/pages/Clubs.js'
import Events from './components/pages/Events.js';
import AboutUs from './components/pages/AboutUs.js';
import Organize from './components/pages/Organize.js';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Register_Events from './components/pages/Register_Events.js';
import Events_Display from './components/pages/Events_Display.js';
import Email_Extract from './components/pages/Email_Extract.js';
import Registration_Select from './components/pages/Registation_Select.js';
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
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Register_Events' element={<Register_Events/>}/> 
          <Route path='/Events_Display' element={<Events_Display/>}/> 
          <Route path='/Email_Extract' element={<Email_Extract/>}/> 
          <Route path='/Registration_Select' element={<Registration_Select/>}/> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
