import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RefreshHandler = ({ setIsAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
                    method: "GET",
                    credentials: "include", // ✅ Send cookie
                });

                console.log(res);


                if (res.ok) {
                    setIsAuthenticated(true);
                    if (
                        location.pathname === "/" ||
                        location.pathname === "/login" ||
                        location.pathname === "/signup"
                    ) {
                        navigate("/home", { replace: true });
                    }
                } else {
                    setIsAuthenticated(false);
                    if (location.pathname !== "/login" && location.pathname !== "/signup") {
                        navigate("/login", { replace: true });
                    }
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setIsAuthenticated(false);
                if (location.pathname !== "/login" && location.pathname !== "/signup") {
                    navigate("/login", { replace: true });
                }
            }
        };

        checkAuth();
    }, [location, navigate, setIsAuthenticated]);

    return null;
};

export default RefreshHandler;
