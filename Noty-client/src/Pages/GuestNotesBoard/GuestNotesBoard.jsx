import styles from "./GuestNotesBoard.module.css";
import { useEffect, useState } from "react";


import { Plus, Search } from "lucide-react";

import { Note } from "../../components/Note/Note";



//modals
import { EditNoteModal } from "../../components/EditNoteModal/EditNoteModal";
import { AddNoteModal } from "../../components/AddNoteModal/AddNoteModal";

import { BaseInput } from "../../components/BaseInput/BaseInput";


export const GuestNotesBoard = () => {

    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
    const [editingNote, setEditingNote] = useState()
    const [notes, setNotes] = useState([])
    const [searchValue, setSearchValue] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem("guestLocalNotes"));
        if (storedNotes) {
            setNotes(storedNotes);
        }
    }, []);

    useEffect(() => {
        // Update local storage when notes state changes
        localStorage.setItem("guestLocalNotes", JSON.stringify(notes));
        setFilteredNotes(notes)
    }, [notes]);


    const handleToggleAddNote = () => {
        if (editingNote) {
            setEditingNote(null)
            return;
        }
        setIsAddNoteOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const searchSubmit = () => {
        const newFilteredNotes = notes.filter((note) =>
            note.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredNotes(newFilteredNotes);
    };

    return (
        <div className={styles["container"]}>

            <div className={`${styles["content-container"]} ${(isAddNoteOpen || editingNote) && styles["container-blur"]}`}>
                <h1>Guest Notes Page</h1>


                <div className={styles["search-wrapper"]}>
                    <BaseInput placeHolder="Search..." onChange={handleSearchChange} />
                    <Search onClick={searchSubmit} />
                </div>



                <div className={styles["notes-container"]}>
                    {notes.map((note) => (
                        <Note key={note.id} {...note} setNotes={setNotes} setEditingNote={setEditingNote} />
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
                {isAddNoteOpen && <AddNoteModal closeModal={() => setIsAddNoteOpen(false)} setNotes={setNotes} />}
                {editingNote && <EditNoteModal {...editingNote} closeModal={() => setEditingNote(null)} setNotes={setNotes} />}
            </div>
        </div>
    );
};
