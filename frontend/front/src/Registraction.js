import React from 'react';
import { Component } from 'react';
import Form from 'react-bootstrap/Form';
import classes from './Registraction.css';
import RegistractionAlert from './RegistractionAlert';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

class Registraction extends Component {
  constructor(props) {
    super(props);
    this.registractionAlert = React.createRef();
  }

  handleSubmit = event => {
    event.preventDefault();
    if(event.target.username.value !== "" && event.target.password.value !== "") {
      console.log("Submit");
      this.registerUser(event.target.username.value, event.target.password.value);
    }
    
  }

  registerUser(username, password) {
    fetch('http://localhost:8080/user', {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {
        username: username,
        password: password,
      })
    }).then(function(response) {
      if (response.status === 200) {
        this.showRegistractionAlert("Succes", "User registered", "You can log in the system now.");
      } else if (response.status === 422) {
        this.showRegistractionAlert("Danger", "User already exists", "Please choose a different name.");
      } else {
        this.showRegistractionAlert("Danger", "User not registered", "Something went wrong");
      }

    }.bind(this)).catch(function(error) {
      this.showRegistractionAlert("Danger", "Error", "Something went wrong!");
    }.bind(this));
  }

  showRegistractionAlert(variant, heading, message) {
    this.registractionAlert.current.setVariant(variant);
    this.registractionAlert.current.setHeading(heading);
    this.registractionAlert.current.setMessage(message);
    this.registractionAlert.current.setVisible(true);
  }

  render() {
    return <>
      <header className={ classes.header }></header>
      <h1 className='h1'>Registraction - please sign up or ||
      <NavLink to={'/login'} style={({ isActive }) => {
                return { color : isActive ? 'red' : 'grey'};
            }}>Sign in</NavLink></h1>
      
        <div className='Register'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="username" size="lg">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" />
            </Form.Group>

            <Form.Group controlId='password' size='lg'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='password' />
            </Form.Group>

            <button type='submit' >Register</button>
       
          </Form>
          
        </div>
      <RegistractionAlert ref={this.registractionAlert} /></>
    
  }
}

export default Registraction;
