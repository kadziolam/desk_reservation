import { Component } from "react";
import classes from './Error.css';

import { Link } from 'react-router-dom';

class Error extends Component {
    render(){
        return (
            <div className='section'>
            <h1 className="title">404 Page not found</h1>
            <p className="title">We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's behalf.</p>
            <Link to={'/'} className='btn'>Home</Link>
            </div>
        )
        
    }
        
}

export default Error;