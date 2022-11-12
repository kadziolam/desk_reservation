import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RegistractionAlert from './RegistractionAlert';
import classes from './Desks.css';
import { Link } from 'react-router-dom'; 
import ReactDOM from 'react-dom';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";



const Desks = () => {

  const [data, setData] = useState([]);
  // setData([{id:1, name:"abc"}])
    var desks = [];
    var abc = "xyz"
    // useEffect(() => {
    //   fetchDesks();
    // }, [])
    fetch('http://localhost:8080/desks', {
      method: 'GET'
    })
    .then(response => response.json())
    // .then(json => {})
    .then(json => setData(json))
    .then(() => console.log(data));
    

  return  (
    <section>
      <h2>List of desk to reserve:</h2>
      <label for="start" >Start date:</label>
      <input type='data' id='start' name="yyyy-mm-dd" min="2018-01-01" max="2018-12-31" placeholder='9999-12-31' />
        <select>
            {data.map((desk) => (
              <option>{desk.name}</option>
            ))}
        </select>
      <br />
      <button type='submit' >Reserve</button>
    </section> 
  );
};



export default Desks;