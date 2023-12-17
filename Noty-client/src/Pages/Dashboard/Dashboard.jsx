import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AddNoteModal } from "./components/AddNoteModal/AddNoteModal";
import { getAllNotes } from "../../api/requests";


import { Note } from "./components/Note/Note";

export const Dashboard = () => {
    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

    const [notes, setNotes] = useState([])

    useEffect(() => {
        (async () => {
            setNotes(await getAllNotes());
        })();
    }, []);

    const handleToggleAddNote = () => {
        setIsAddNoteOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <div className={styles["container"]}>

            <div className={`${styles["content-container"]} ${isAddNoteOpen && styles["container-blur"]}`}>
                <h1>Dashboard</h1>

                <div className={styles["notes-container"]}>
                    {notes.map((note) => (
                        <Note key={note.id} {...note} />
                    ))}
                </div>
            </div>

            <div className={styles["modal-container"]}>
                <div
                    className={styles["add-item-wrapper"]}
                    onClick={handleToggleAddNote}
                    style={{
                        background: isAddNoteOpen
                            ? "radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"
                            : "rgb(34,193,195)",
                    }}
                >
                    {isAddNoteOpen ? (
                        <Plus style={{ transform: "rotate(45deg)" }} />
                    ) : (
                        <Plus />
                    )}
                </div>
                {isAddNoteOpen && <AddNoteModal closeModal={() => setIsAddNoteOpen(false)} />}
            </div>
        </div>
    );
};
