import styles from "./ManageAccessModal.module.css"
import { useState } from "react";
import { Search } from "lucide-react";
import { usersSearch } from "../../../../api/requests";
import { BaseInput } from "../../../../components/BaseInput/BaseInput";
import { Invite } from "../Invite/Invite";
import { errorNotification } from "../../../../utilities/Notifications";


export const ManageAccessModal = ({ closeModal, _id }) => {

    const [searchValue, setSearchValue] = useState("");
    const [searchedUsers, setSearchedUsers] = useState([]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const searchSubmit = async () => {
        if(searchValue === ""){
            setSearchedUsers([])
            errorNotification("Search input empty!")
            return;
        }
        const users = await usersSearch({"username": searchValue})
        setSearchedUsers(users);
    };

    const handleAddUser = async (_userId) => {
        const result = await sendInvite(_userId, _id)
    }

    const handleRemoveUser = async () => {

    }

    return (
        <div className={styles["container"]}>

            <div className={styles["search-wrapper"]}>
                <div>
                    <h1>Manage access to group</h1>
                    <div className={styles["search"]}>
                        <BaseInput placeHolder="Search..." value={searchValue} onChange={handleSearchChange} />
                        <Search onClick={searchSubmit}/>
                    </div>
                </div>

                <div className={styles["search-results"]}>
                            {searchedUsers && searchedUsers.map(user =>  <Invite username={user.username}/>)}
                </div>

            </div>

            <div>
                <h2>Access currently avaliable to:</h2>
                <div>

                </div>
            </div>
        </div>
    )
}