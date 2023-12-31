import styles from "./Dashboard.module.css";
import { useEffect, useState, useContext } from "react";
import { Plus } from "lucide-react";

import { NoteGroup } from "./components/NoteGroup/NoteGroup";

import { getAllNoteGroups } from "../../api/requests";

//modals
import { EditNoteGroupModal } from "./components/EditNoteGroupModal/EditNoteGroupModal";
import { AddNoteGroupModal } from "./components/AddNoteGroupModal/AddNoteGroupModal";

//contexts
import { AuthContext } from "../../contexts/AuthContext";
import { AuthorizationModal } from "../../components/AuthorizationModal/AuthorizationModal";
import { ManageAccessModal } from "./components/ManageAccessModal/ManageAccessModal";


export const Dashboard = () => {

    const { isAuthenticated } = useContext(AuthContext)


    const [noteGroups, setNoteGroups] = useState([])

    //modal states
    const [authorizationModal, setAuthorizationModal] = useState(true)
    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
    const [editingNote, setEditingNote] = useState()
    const [managingAccess, setManagingAccess] = useState()

    useEffect(() => {
        if (isAuthenticated) {
            (async () => {
                setNoteGroups(await getAllNoteGroups());
            })();
            setAuthorizationModal(false);
        } else {
            setAuthorizationModal(true);
        }
    }, [isAuthenticated]); 


    const handleToggleAddNote = () => {
        if (editingNote || managingAccess) {
            setEditingNote(null)
            setManagingAccess(null)
            return;
        }
        setIsAddNoteOpen((prevIsOpen) => !prevIsOpen);
    };


    return (
        <div className={styles["container"]}>

            <div className={`${styles["content-container"]} ${(isAddNoteOpen || editingNote || managingAccess || authorizationModal) && styles["container-blur"]}`}>
                <h1>Dashboard</h1>

                {(!authorizationModal && isAuthenticated) &&
                    <div className={styles["notes-container"]}>
                        {noteGroups.map((note) => (
                            <NoteGroup key={note.id} {...note} setNoteGroups={setNoteGroups} setEditingNote={setEditingNote} setManagingAccess={setManagingAccess}/>
                        ))}
                    </div>
                }
            </div>

            <div className={styles["modal-container"]}>
                <div
                    className={styles["add-item-wrapper"]}
                    onClick={handleToggleAddNote}
                    style={{
                        background: (isAddNoteOpen || editingNote || managingAccess)
                            ? "radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"
                            : "rgb(34,193,195)",
                    }}
                >
                    {(isAddNoteOpen || editingNote || managingAccess) ? (
                        <Plus style={{ transform: "rotate(45deg)" }} />
                    ) : (
                        <Plus />
                    )}
                </div>
                {isAddNoteOpen && <AddNoteGroupModal closeModal={() => setIsAddNoteOpen(false)} setNoteGroups={setNoteGroups} />}
                {editingNote && <EditNoteGroupModal {...editingNote} closeModal={() => setEditingNote(null)} setNoteGroups={setNoteGroups} />}
                {managingAccess && <ManageAccessModal {...managingAccess} />}
                {authorizationModal && <AuthorizationModal setAuthorizationModal={setAuthorizationModal} />}
            </div>
        </div>
    );
};
