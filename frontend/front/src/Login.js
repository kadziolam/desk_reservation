import React from 'react';
import { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


class Login extends Component {

    handleSubmit = event => {
        event.preventDefault();
        if(event.target.username.value !== "" && event.target.password.value !== "") {
          console.log("Submit");
          this.registerUser(event.target.username.value, event.target.password.value);
        }
        
      }
    login(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };
        return fetch('http://localhost:8080/authenticate', requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
    }


      render() {
        return <>
        <h1 className='h1'>Please sign in or || 
              <NavLink to={'/'}>Back to registraction</NavLink></h1>
              <div className='Login'>
                  <Form>
                      <Form.Group controlId="username" size="lg">
                          <Form.Label>Username</Form.Label>
                          <Form.Control name="username" />
                      </Form.Group>

                      <Form.Group controlId='password' size='lg'>
                          <Form.Label>Password</Form.Label>
                          <Form.Control type='password' name='password' />
                      </Form.Group>
                      <button type='submit'>Login</button>
                  </Form>
              </div></>    
            
    }
}

export default Login;