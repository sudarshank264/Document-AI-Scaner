import React, { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await loginUser(form);
        if (res.token) {
            localStorage.setItem('token', res.token);
            navigate('/dashboard');
        }
    };

    return (
        <div className='container' >
            <h2 className='form-container'>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
