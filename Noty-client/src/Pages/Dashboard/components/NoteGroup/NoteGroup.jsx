import styles from "./NoteGroup.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { MoreHorizontal } from "lucide-react"
import { deleteNote } from "../../../../api/requests"

import { NotesNotifications } from "../../../../utilities/Notifications"



export const NoteGroup = ({ title, description, _id, setNoteGroups, setEditingNote }) => {
    const navigate = useNavigate();
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const handleOptionsClick = (e) => {
        // Stop the event from propagating to the parent div (container)
        e.stopPropagation();
        setIsOptionsOpen(!isOptionsOpen);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure that you want to delete that note?")) {
            const noteGroup = await deleteNote(_id);
            setNoteGroups((prevNoteGroups) => prevNoteGroups.filter((note) => note._id !== _id))
            NotesNotifications.deleteNoteSuccess();
        }
    };

    const handleEdit = () => {
        setEditingNote({ title, description, _id });
        setIsOptionsOpen(false);
    };

    return (
        <div className={styles["container"]}>
            <div className={styles["content"]} onClick={() => navigate(`/dashboard/${_id}`)}>
                <h1>{title}</h1>
                <div className={styles["actions-container"]}>
                    <div onClick={handleOptionsClick}>
                        <MoreHorizontal />
                    </div>
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

