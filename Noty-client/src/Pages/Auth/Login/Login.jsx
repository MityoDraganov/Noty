import styles from "./Login.module.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { AuthNotifications } from "../../../utilities/Notifications"

import { BaseButton } from "../../../components/BaseButton/BaseButton"
import { BaseInput } from "../../../components/BaseInput/BaseInput"
import { setAuth } from "../../../utilities/AuthStateController"

import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { userLogin } from "../../../api/requests"


export const Login = () => {

    const navigate = useNavigate()

    const {setAccessData} = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
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
        if (!credentials.email || !credentials.password) {
            AuthNotifications.emptyFields();
            return;
        }
        const result = await userLogin(credentials)
        
        setAccessData(result)
        setAuth(result)
        
        AuthNotifications.successAuth();
        navigate("/")
    };

    return (
        <div className={styles["container"]}>

            <h1>Login</h1>
            <div className={styles["form-wrapper"]}>
                <form onSubmit={onSubmitHandler}>
                    <label>E-mail</label>
                    <BaseInput onChange={onChangeHandler} value={credentials.email} name="email" />

                    <label>Password</label>
                    <BaseInput onChange={onChangeHandler} value={credentials.password} name="password" type="password" />

                    <div className={styles["button-wrapper"]}>
                        <BaseButton buttonLabel={"Submit"} type="submit" />
                    </div>

                    <p>Do not have an acoount? <Link to="/register">Register</Link></p>
                </form>
            </div>
        </div>
    )
}