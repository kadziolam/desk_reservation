import { Component } from 'react';
import classes from './App.css';
import Registraction from './Registraction.js';
import Desks from './Desks';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './Error';
import Navbar from './Navbar';
import SingleDesk from './SingleDesk'
import Login from './Login'
import { createRoot } from "react-dom/client";

class App extends Component {
  render() {
    return  (
      <BrowserRouter>      
        <Routes>          
          <Route path='/' element = {<Registraction />}/> 
          {/* <Route path='/login' element = {<Login />}/>            */}
          <Route path='/desks' element = {<Desks />}/>
          <Route path='/desks:deskId' element = {<SingleDesk />}/>
          <Route path='/*' element = {<Error />}/>                 
        </Routes>
        <footer >Desk reservation system</footer>
      </BrowserRouter>  
        
    )

  }
}

export default App;
