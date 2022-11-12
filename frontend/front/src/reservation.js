// import React from 'react';
// import { Component } from 'react';
// import Form from 'react-bootstrap/Form';
// import classes from './Registraction.css';
// import RegistractionAlert from './RegistractionAlert';
// import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

// class reservation extends Component {
//     handleSubmit = event => {
//         event.preventDefault();
//         if(event.target.desk.value !== "" && event.target.start.value !== "") {
//           console.log("Submit");
//           this.reserveDesk(event.target.desk.value, event.target.start.value);
//         }
        
//       }

//       reserveDesk(start, desk) {
//         fetch('http://localhost:8080/create-reservation', {
//           method: 'POST',
//           headers: {
//             'Accept' : 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify( {
//             desk: deskId,
//             start: date,
//           })
//         }).then(function(response) {
//           if (response.status === 200) {
//             this.showRegistractionAlert("Succes", "You reserved desk");
//           }
// }