import styles from "./Invite.module.css"

import { Send } from "lucide-react"

export const Invite = ({username, _id, handleAddUser}) => {



    return(
        <div className={styles["container"]}>
            <p>{username}</p>
            <div>
                <Send onClick={() => handleAddUser(_id)}/>
            </div>
        </div>
    )
}