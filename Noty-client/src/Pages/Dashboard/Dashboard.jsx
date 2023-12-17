import styles from "./Dashboard.module.css";
import { useState } from "react";
import { Plus } from "lucide-react";
import { AddNoteModal } from "./components/AddNoteModal/AddNoteModal";

export const Dashboard = () => {
    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

    const handleToggleAddNote = () => {
        setIsAddNoteOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <div className={styles["container"]}>

            <div className={`${styles["content-container"]} ${isAddNoteOpen && styles["container-blur"]}`}>
                <h1>Dashboard</h1>



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
                {isAddNoteOpen && <AddNoteModal />}
            </div>
        </div>
    );
};
