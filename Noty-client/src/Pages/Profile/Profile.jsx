import styles from "./Profile.module.css"
import { useEffect, useState } from "react"
import { userProfile } from "../../api/requests"
import { Invite } from "./components/Invite"

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
            },
            notifications: []
        }]
    })

    useEffect(() => {
        (async () => {
            setProfileData(await userProfile())
        })()
    }, [])

    return (
        <div className={styles["container"]}>
            <h1>Profile Page</h1>

            <div>
                <h2>Inbox</h2>
                <div className={styles["notifications-container"]}>
                    {profileData.notifications ? (
                        profileData.notifications.map((notification, index) => (
                           <Invite index={index} notification={notification}/>
                        ))
                    ) : (
                        <h2>No notifications yet!</h2>
                    )}
                </div>
            </div>
        </div>
    )
}