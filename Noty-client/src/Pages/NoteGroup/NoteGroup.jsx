import styles from "./NoteGroup.module.css";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { Note } from "./components/Note/Note";

import { getAllNotes } from "../../api/requests";

//modals
import { EditNoteModal } from "./components/EditNoteModal/EditNoteModal";
import { AddNoteModal } from "./components/AddNoteModal/AddNoteModal";

export const Dashboard = () => {
    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

    const [editingNote, setEditingNote] = useState()

    const [notes, setNotes] = useState([])

    useEffect(() => {
        (async () => {
            setNotes(await getAllNotes());
        })();
    }, []);

    const handleToggleAddNote = () => {
        if(editingNote){
            setEditingNote(null)
            return;
        }
        setIsAddNoteOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <div className={styles["container"]}>

            <div className={`${styles["content-container"]} ${(isAddNoteOpen || editingNote) && styles["container-blur"]}`}>
                <h1>Note Group</h1>

                <div className={styles["notes-container"]}>
                    {notes.map((note) => (
                        <Note key={note.id} {...note} setNotes={setNotes} setEditingNote={setEditingNote}/>
                    ))}
                </div>
            </div>

            <div className={styles["modal-container"]}>
                <div
                    className={styles["add-item-wrapper"]}
                    onClick={handleToggleAddNote}
                    style={{
                        background: (isAddNoteOpen || editingNote)
                            ? "radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"
                            : "rgb(34,193,195)",
                    }}
                >
                    {(isAddNoteOpen || editingNote) ? (
                        <Plus style={{ transform: "rotate(45deg)" }} />
                    ) : (
                        <Plus />
                    )}
                </div>
                {isAddNoteOpen && <AddNoteModal closeModal={() => setIsAddNoteOpen(false)} setNotes={setNotes}/>}
                {editingNote && <EditNoteModal {...editingNote} closeModal={() => setEditingNote(null)} setNotes={setNotes}/>}
            </div>
        </div>
    );
};
