import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { failToast, successToast } from '../Utils/ToastMessages';

const Home = () => {
    const url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useState("");
    const [products, setProducts] = useState([]);

    // Fetch logged-in user from server (via cookie)
    const fetchUser = async () => {
        try {
            const res = await fetch(`${url}/auth/me`, {
                method: "GET",
                credentials: "include", // ✅ include cookie
            });

            if (!res.ok) {
                throw new Error("Unauthorized. Please login.");
            }

            const data = await res.json();
            setLoggedInUser(data?.data?.name || "User");
        } catch (error) {
            failToast(error.message);
            navigate("/login");
        }
    };

    // Logout user by clearing cookie
    const handleLogout = async () => {
        try {
            const res = await fetch(`${url}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error("Logout failed");
            }

            successToast("User logged out successfully");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            failToast(error.message);
        }
    };

    // Fetch products using credentials (cookie)
    const fetchProducts = async () => {
        try {
            const res = await fetch(`${url}/products`, {
                method: "GET",
                credentials: "include", // ✅ cookie used for auth
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to fetch products");
            }

            const data = await res.json();
            setProducts(data.data || []);
        } catch (error) {
            failToast(error.message);
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchUser(); // ✅ check session
        fetchProducts(); // ✅ fetch protected data
    }, []);

    return (
        <div className="home-container">
            <h2>Welcome, {loggedInUser || "Guest"}!</h2>
            <button onClick={handleLogout}>Logout</button>

            <h3>Product List:</h3>
            {products.length > 0 ? (
                <ul>
                    {products.map((product, index) => (
                        <li key={index}>
                            {product.name} - ${product.price}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default Home;
