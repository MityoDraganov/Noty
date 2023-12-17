import styles from "./Navbar.module.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

//import { AuthContext } from "../../contexts/AuthContext/AuthContext";

import { Menu } from "lucide-react";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    //const { isAuthenticated } = useContext(AuthContext);
    const isAuthenticated = false

    const closeNavigation = () => {
        setIsOpen(false);
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
                                <Link to="/logout" >
                                    Logout
                                </Link>
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