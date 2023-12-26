import styles from "./Profile.module.css"
import { useEffect, useState } from "react"
import { acceptInvite, getPermitedNoteGroups, rejectInvite, removeMyAccess, userProfile } from "../../api/requests"
import { Invite } from "./components/Invite/Invite"
import { NoteGroupsNotifications, inviteNotifications } from "../../utilities/Notifications"
import { PermitedGroup } from "./components/PermitedGroup/PermitedGroup"

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

    const [permitedNoteGroups, setPermitedNoteGroups] = useState([])

    useEffect(() => {
        (async () => {
            setProfileData(await userProfile())
            setPermitedNoteGroups(await getPermitedNoteGroups())
        })()
    }, [])

    const handleAcceptInvite = async (inviteId) => {
        console.log("here");
        // Assuming acceptInvite returns a result, you can use it to update the state
        const result = await acceptInvite({ notificationId: inviteId });
        inviteNotifications.inviteAccepted();

        // Update state to remove the accepted invite
        setProfileData((prevData) => ({
            ...prevData,
            notifications: prevData.notifications.filter(notification => notification._id !== inviteId)
        }));
    }

    const handleRejectInvite = async (inviteId) => {
        // Assuming rejectInvite returns a result, you can use it to update the state
        const result = await rejectInvite({ notificationId: inviteId });
        inviteNotifications.inviteRejected();

        // Update state to remove the rejected invite
        setProfileData((prevData) => ({
            ...prevData,
            notifications: prevData.notifications.filter(notification => notification._id !== inviteId)
        }));
    }

    const handleRemoveMyAccess = async (noteGroupId) => {
        const result = await removeMyAccess(noteGroupId);
        setPermitedNoteGroups((prevGroups) => prevGroups.filter(group => group._id !== noteGroupId));
        NoteGroupsNotifications.removeMyAccessSuccess();
    }
    

    return (
        <div className={styles["container"]}>
            <h1>Profile Page</h1>

            <div>
                <h2>Inbox</h2>
                <div className={styles["notifications-container"]}>
                    {(profileData.notifications && profileData.notifications.length > 0) ? (
                        profileData.notifications.map((notification, index) => (
                            <Invite key={index} index={index} notification={notification} acceptInvite={handleAcceptInvite} rejectInvite={handleRejectInvite}/>
                        ))
                    ) : (
                        <h2>No notifications yet!</h2>
                    )}
                </div>
            </div>

            <div className={styles["permited-users-container"]}>
                <h2>Permited Note Groups</h2>
                <div>
                    {permitedNoteGroups && permitedNoteGroups.map((group, index) => (
                        <PermitedGroup key={index} {...group} removeAccess={handleRemoveMyAccess} />                        
                    ))}
                </div>
            </div>
        </div>
    )
}