import styles from "./ManageAccessModal.module.css"
import { useState } from "react";
import { Search, X } from "lucide-react";
import { sendInvite, usersSearch } from "../../../../api/requests";
import { BaseInput } from "../../../../components/BaseInput/BaseInput";
import { Invite } from "../Invite/Invite";
import { errorNotification, inviteNotifications } from "../../../../utilities/Notifications";
import { BaseButton } from "../../../../components/BaseButton/BaseButton";


export const ManageAccessModal = ({ _id, permitedUsers, owner }) => {

    const [searchValue, setSearchValue] = useState("");
    const [searchedUsers, setSearchedUsers] = useState([]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const searchSubmit = async () => {
        if (searchValue === "") {
            setSearchedUsers([])
            errorNotification("Search input empty!")
            return;
        }
        const users = await usersSearch({ "username": searchValue })
        setSearchedUsers(users);
    };

    const handleAddUser = async (userId) => {
        const result = await sendInvite({userId: userId, projectId: _id})
        inviteNotifications.inviteSent()
    }

    const handleRemoveUser = async (_userId) => {
        inviteNotifications.inviteSent()
    }

    return (
        <div className={styles["container"]}>

            <div className={styles["search-wrapper"]}>
                <div>
                    <h1>Manage access to group</h1>
                    <div className={styles["search"]}>
                        <BaseInput placeHolder="Search..." value={searchValue} onChange={handleSearchChange} />
                        <Search onClick={searchSubmit} />
                    </div>
                </div>

                <div className={styles["search-results"]}>
                    {searchedUsers.length > 0
                        ?
                        searchedUsers.map(user => <Invite username={user.username} handleAddUser={() => (handleAddUser(user._id))} />)
                        :
                        <h3>No users found!</h3>}
                </div>
            </div>

            <div className={styles["permited-users"]}>
                <h2>Access currently avaliable to:</h2>
                <div>

                    {permitedUsers && permitedUsers.map(user =>
                        <div className={styles["permited-user"]}>
                            {user.username}
                            {owner !== user._id ?
                                <div className={styles["remove-btn-wrapper"]}>
                                    <BaseButton buttonLabel={<X />} onClick={() => handleRemoveUser(user._id)} />
                                </div>
                                :
                                <div>
                                    <p>(YOU)</p>
                                </div>
                            }
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}