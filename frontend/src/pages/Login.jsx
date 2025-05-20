import React, { useState } from 'react';
import '../styles/signup.css';
import { successToast, failToast } from '../Utils/ToastMessages.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // const isLoggedin=
            const response = await fetch(`${url}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                const { token, name } = result.data;

                localStorage.setItem("token", token);
                localStorage.setItem("loggedInUser", name);

                successToast('login successfully! ');
                navigate("/home");
            } else {

                failToast(response.statusText);
            }

        } catch (error) {
            failToast("Signup failed due to server error");
            console.error(error);
        }
    };

    return (
        <div className="signup-container">
            <h1>Login here</h1>
            <form onSubmit={handleSubmit}>

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
                <button type="submit">Login</button>

                <span className="login-link">
                    Doesn't have an account? <Link to="/signup">Signup</Link>
                </span>
            </form>
        </div>
    );
};

export default Login;
