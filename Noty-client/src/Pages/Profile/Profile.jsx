import styles from "./Profile.module.css"
import { useEffect, useState } from "react"
import { userProfile } from "../../api/requests"

export const Profile = () => {

    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        notifications: [{
            type: "",
            project: {
            },
            sentBy: {
            },
            addressedTo: {
            }
        }]
    })

    useEffect(() => {
        (async () => {
            setProfileData(await userProfile)
        })()
    }, [])

    return(
        <div className={styles["container"]}>
            <h1>Profile Page</h1>

            <div>
                <h2>Inbox</h2>
                <div>
                    {profileData.notifications.map(notification => (
                        <p>{notification.sentBy.username} sent you an invite</p>
                    )
                    )}
                </div>
            </div>
        </div>
    )
}