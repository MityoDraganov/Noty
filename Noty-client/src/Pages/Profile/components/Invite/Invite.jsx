import styles from "./Invite.module.css"
import { BaseButton } from "../../../../components/BaseButton/BaseButton"
import { Check, X } from "lucide-react"

export const Invite = ({ notification, index, acceptInvite, rejectInvite }) => {

    return (
        <div className={styles["container"]}>
            <p key={index}>User {notification.sentBy.username} sent you an invite for project - {notification.project.title}</p>
            <div className={styles["actions-container"]}>
                <div>
                    <BaseButton onClick={() => acceptInvite(notification._id)} buttonLabel={<Check />}/>
                </div>

                <div>
                    <BaseButton onClick={() => rejectInvite(notification._id)} buttonLabel={<X />}/>
                </div>
            </div>
        </div>
    )
}