import React, { useState } from 'react';
import '../styles/signup.css';
import { successToast, failToast } from '../Utils/ToastMessages.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${url}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                successToast('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                console.log(response);

                failToast(response.statusText);
            }

        } catch (error) {
            failToast("Signup failed due to server error");
            console.error(error);
        }
    };

    return (
        <div className="signup-container">
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoFocus
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>

                <span className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            </form>
        </div>
    );
};

export default Signup;
