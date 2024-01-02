import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h1>The ArrayTics Task</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <NavLink to="/create" style={{
                    color: 'white',
                    backgroundColor: '#f1356d',
                    borderRadius: '8px',
                    marginRight: '10px'
                }}>Add New</NavLink>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </nav>
    );
}

export default NavBar;
