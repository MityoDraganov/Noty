import styles from "./NoteGroup.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { MoreHorizontal } from "lucide-react"
import { deleteNote } from "../../../../api/requests"

import { NotesNotifications } from "../../../../utilities/Notifications"



export const NoteGroup = ({ title, description, _id, setNoteGroups, setEditingNote }) => {

    const navigate = useNavigate()

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const handleDelete = async () => {
        if (window.confirm("Are you sure that you want to delete that note?")) {
            const result = await deleteNote(_id);
            NotesNotifications.deleteNoteSuccess();
            setNoteGroups(result);
        }
    };

    const handleEdit = () => {
        setEditingNote({ title, description, _id });
        setIsOptionsOpen(false);
    };

    const handleContainerClick = (e) => {
        if (e.target.closest(".options-container")) {
            return;
        }
        else{
            navigate(`/dashboard/${_id}`)

        }

    };




    return (
        <div className={styles["container"]} onClick={handleContainerClick}>
            <h1>{title}</h1>

            <div className={styles["actions-container"]}>
                <div onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
                    <MoreHorizontal />
                </div>
            </div>

            {isOptionsOpen && (
                <div className={styles["options-container"]}>
                    <ul>
                        <li onClick={handleEdit}>Edit</li>
                        <li onClick={handleDelete}>Delete</li>
                    </ul>
                </div>
            )}
        </div>
    );
};
