import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { NoteGroup } from "./components/NoteGroup/NoteGroup";

import { getAllNoteGroups } from "../../api/requests";

//modals
import { EditNoteGroupModal } from "./components/EditNoteGroupModal/EditNoteGroupModal";
import { AddNoteGroupModal } from "./components/AddNoteGroupModal/AddNoteGroupModal";

export const Dashboard = () => {
    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

    const [editingNote, setEditingNote] = useState()

    const [noteGroups, setNoteGroups] = useState([])

    useEffect(() => {
        (async () => {
            setNoteGroups(await getAllNoteGroups());
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
                <h1>Dashboard</h1>


                <div className={styles["notes-container"]}>
                    {noteGroups.map((note) => (
                        <NoteGroup key={note.id} {...note} setNoteGroups={setNoteGroups} setEditingNote={setEditingNote}/>
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
                {isAddNoteOpen && <AddNoteGroupModal closeModal={() => setIsAddNoteOpen(false)} setNoteGroups={setNoteGroups}/>}
                {editingNote && <EditNoteGroupModal {...editingNote} closeModal={() => setEditingNote(null)} setNotes={setNotes}/>}
            </div>
        </div>
    );
};
