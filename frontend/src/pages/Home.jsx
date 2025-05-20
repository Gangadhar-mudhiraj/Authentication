import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { failToast, successToast } from '../Utils/ToastMessages';

const Home = () => {
    const url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useState("");
    const [products, setProducts] = useState([]);

    // Check user on load
    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        const token = localStorage.getItem("token");

        if (!user || !token) {
            failToast("Unauthorized. Redirecting to login.");
            navigate("/login");
        } else {
            setLoggedInUser(user);
        }
    }, [navigate]);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        setLoggedInUser(null);

        successToast("User logged out successfully");

        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${url}/products`, {
                method: "GET",
                headers: {
                    "Authorization": localStorage.getItem("token"), // optionally prefix with Bearer
                    "Content-Type": "application/json"
                }
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

    // Fetch products on mount
    useEffect(() => {
        fetchProducts();
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
