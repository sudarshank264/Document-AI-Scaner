import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await registerUser(form);
        if (res.message === 'User registered') navigate('/login');
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
