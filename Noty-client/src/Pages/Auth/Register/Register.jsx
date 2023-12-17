import styles from "./Register.module.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { AuthNotifications } from "../../../utilities/Notifications"

import { BaseButton } from "../../../components/BaseButton/BaseButton"
import { BaseInput } from "../../../components/BaseInput/BaseInput"
import { setAuth } from "../../../utilities/AuthStateController"

import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext.jsx"

export const Register = () => {

    const {setAccessData} = useContext(AuthContext)
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: ""
    })

    const onChangeHandler = (e) => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [e.target.name]: e.target.value,
        }));
    };


    const onSubmitHandler = (e) => {
        e.preventDefault();

        // Example usage
        if (!credentials.firstName || !credentials.lastName || !credentials.email || !credentials.password || !credentials.rePassword) {
            AuthNotifications.emptyFields();
            return;
        }

        if (credentials.password !== credentials.rePassword) {
            AuthNotifications.passwordsDoNotMatch();
            return;
        }

        
        setAccessData(credentials)
        setAuth(credentials)
    
        AuthNotifications.successAuth();

        navigate("/")
    };


    return (
        <div className={styles["container"]}>
            <h1>Register</h1>
            <div className={styles["form-wrapper"]}>
                <form onSubmit={onSubmitHandler}>
                    <label>First name</label>
                    <BaseInput onChange={onChangeHandler} value={credentials.firstName} name="firstName" />

                    <label>Last name</label>
                    <BaseInput onChange={onChangeHandler} value={credentials.lastName} name="lastName" />

                    <label>E-mail</label>
                    <BaseInput onChange={onChangeHandler} value={credentials.email} name="email" />

                    <label>Passoword</label>
                    <BaseInput onChange={onChangeHandler} value={credentials.password} name="password" type="password" />

                    <label>Confirm passoword</label>
                    <BaseInput onChange={onChangeHandler} value={credentials.rePassword} name="rePassword" type="password" />

                    <div className={styles["button-wrapper"]}>
                        <BaseButton buttonLabel={"Submit"} type="submit" />
                    </div>

                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </form>
            </div>
        </div>
    )
}