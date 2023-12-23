import styles from "./AuthorizationModal.module.css"
import { useNavigate } from "react-router-dom"

export const AuthorizationModal = ({setAuthorizationModal}) => {

    const navigate = useNavigate()

    const userHandler = () => {
        navigate("/register")
        setAuthorizationModal(false)
    }

    const guestHandler = () => {
        navigate("/guestNotesBoard")
        setAuthorizationModal(false)
    }

    return(
        <div className={styles["container"]}>

            <div className={styles["authenticated-users"]}>
                <h1>Would you like to sign in?</h1>
                <ul>
                    <li>Save your notes</li>
                    <li>Add colaborators to your note groups</li>
                    <li>Access your inforamtion from anywhere</li>
                </ul>

                <button onClick={userHandler}>Sign in</button>
            </div>

            
            <div className={styles["guest-users"]}>
                <h2>Continue as a guest?</h2>
                <ul>
                    <li>Temporary save your notes</li>
                    <li>You would not be able to add colaborators to your note groups</li>
                    <li>Access your inforamtion from that same device</li>
                </ul>
                <button onClick={guestHandler}>Continue as a guest</button>
            </div>


        </div>
    )
}