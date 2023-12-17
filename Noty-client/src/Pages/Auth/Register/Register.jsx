import styles from "./Register.module.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { AuthNotifications } from "../../../utilities/Notifications"

import { BaseButton } from "../../../components/BaseButton/BaseButton"
import { BaseInput } from "../../../components/BaseInput/BaseInput"

import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext.jsx"
import { userRegister } from "../../../api/requests"
import { setAuth } from "../../../utilities/AuthStateController"


export const Register = () => {

    const {setAccessData} = useContext(AuthContext)
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        username: "",
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


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Example usage
        if (!credentials.username || !credentials.email || !credentials.password || !credentials.rePassword) {
            AuthNotifications.emptyFields();
            return;
        }

        if (credentials.password !== credentials.rePassword) {
            AuthNotifications.passwordsDoNotMatch();
            return;
        }


        const result = await userRegister(credentials)
        
        setAccessData(result)
        setAuth(result)
    
        AuthNotifications.successAuth();

        navigate("/")
    };


    return (
        <div className={styles["container"]}>
            <h1>Register</h1>
            <div className={styles["form-wrapper"]}>
                <form onSubmit={onSubmitHandler}>
                    <label>Username</label>
                    <BaseInput onChange={onChangeHandler} value={credentials.username} name="username" />


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