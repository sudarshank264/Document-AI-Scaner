import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/upload">Upload</Link>
            {localStorage.getItem('token') ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;
