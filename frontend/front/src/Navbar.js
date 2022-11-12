import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className='navbar'>
            <p>Desk reservation system</p>
            <NavLink to={'/desks'} style={({ isActive }) => {
                return { color : isActive ? 'red' : 'grey'};
            }}>Desks</NavLink>
            <NavLink to={'/login'} style={({ isActive }) => {
                return { color : isActive ? 'red' : 'grey'};
            }}>Sign in</NavLink>
            <NavLink to={'/'} style={({ isActive }) => {
                return { color : isActive ? 'red' : 'grey'};
            }}>Logout</NavLink>
        </nav>
    )
}

export default Navbar;