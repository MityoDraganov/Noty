import styles from "./Note.module.css"
import { useState, useContext } from "react"

import { MoreHorizontal } from "lucide-react"
import { deleteNote } from "../../api/requests.jsx"

import { NotesNotifications } from "../../utilities/Notifications.jsx"

import { AuthContext } from "../../contexts/AuthContext"


export const Note = ({ title, description, _id, setNotes, setEditingNote }) => {

    const { isAuthenticated } = useContext(AuthContext)

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const handleDelete = async () => {
        if (window.confirm("Are you sure that you want to delete that note?")) {

            if (isAuthenticated) {
                await deleteNote(_id);
            }
            NotesNotifications.deleteNoteSuccess();


            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== _id));
        }
    };

    const handleEdit = () => {
        setEditingNote({ title, description, _id });
        setIsOptionsOpen(false);
    };

    const handleTextAreaChange = (e) => {
        setEditingNote((prevNote) => ({ ...prevNote, description: e.target.value }));
    };

    return (
        <div className={styles["container"]}>
            <h1>{title}</h1>
            <textarea readOnly={true} value={description} onChange={handleTextAreaChange} />

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
