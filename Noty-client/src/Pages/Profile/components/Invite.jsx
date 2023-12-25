import styles from "./Invite.module.css"
import { BaseButton } from "../../../components/BaseButton/BaseButton"
import { Check, X } from "lucide-react"

export const Invite = ({ notification, index, acceptInvite, rejectInvite }) => {

    return (
        <div className={styles["container"]}>
            <p key={index}>{notification.sentBy.username} sent you an invite</p>
            <div>
                <div>
                    <BaseButton onClick={acceptInvite} buttonLabel={<Check />}/>
                </div>

                <div>
                    <BaseButton onClick={rejectInvite} buttonLabel={<X />}/>
                </div>
            </div>
        </div>
    )
}