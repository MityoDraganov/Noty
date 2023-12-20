import styles from "./Navbar.module.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import { Menu } from "lucide-react";
import { clearAuth } from "../../utilities/AuthStateController";

export const Navbar = () => {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);

    const { isAuthenticated, setAccessData } = useContext(AuthContext);

    console.log(isAuthenticated);

    const closeNavigation = () => {
        setIsOpen(false);
    };

    const logoutHandler = () => {
        if (confirm("Are you sure that you want to logout of your account?")) {
            clearAuth();
            setAccessData({
                "authorization-token": "",
                "_id": ""
            });

            // Close navigation after performing logout actions
            closeNavigation();
            
            // Navigate to the login page
            navigate("/login");
        }
    };

    return (
        <div className={`${styles["container"]} ${isOpen ? styles["isOpen"] : ""}`}>
            {isOpen ? (
                <>
                    <Menu
                        size={32}
                        onClick={() => setIsOpen(false)}
                        style={{ transform: "rotate(90deg)" }}
                    />
                    <>
                        <Link to="/" onClick={closeNavigation}>
                            Home
                        </Link>
                        <Link to="/dashboard" onClick={closeNavigation}>
                            Dashboard
                        </Link>
                        <Link to="/about" onClick={closeNavigation}>
                            About
                        </Link>
                        <Link to="/contact" onClick={closeNavigation}>
                            Contact
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" onClick={closeNavigation}>
                                    Profile
                                </Link>
                                <a onClick={logoutHandler} onClick={closeNavigation}>
                                    Logout
                                </a>
                            </>
                        ) : (
                            <>
                                <Link to="/register" onClick={closeNavigation}>
                                    Sign up
                                </Link>
                            </>
                        )}
                    </>
                </>
            ) : (
                <>
                    <Menu size={32} onClick={() => setIsOpen(true)} />
                </>
            )}
        </div>
    );
};