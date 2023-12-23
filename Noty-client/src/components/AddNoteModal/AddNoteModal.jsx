
import styles from "./AddNoteModal.module.css"
import { useParams } from "react-router-dom"
import { useState, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

import { NotesNotifications } from "../../utilities/Notifications.jsx"
import { createNote } from "../../api/requests.jsx"


import { BaseInput } from "../BaseInput/BaseInput"
import { BaseButton } from "../BaseButton/BaseButton"


export const AddNoteModal = ({ closeModal, setNotes }) => {

    const { groupId } = useParams()

    const { isAuthenticated } = useContext(AuthContext)

    const [data, setData] = useState({
        title: "",
        description: ""
    })

    const onChangeHandler = (e) => {
        setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault()


        if (!data.title || !data.description) {
            NotesNotifications.emptyFields();
            return;
        }

        if (isAuthenticated) {
            const newNote = await createNote(groupId, data)
            setNotes((prevNotes) => [...prevNotes, newNote]);
            NotesNotifications.createNoteSuccess()
        } else {
            setNotes((prevNotes) => [...prevNotes, data]);
            NotesNotifications.createNoteSuccess()
        }

        closeModal()
    }

    return (
        <div className={styles["container"]}>
            <h1>Add Note</h1>

            <form className={styles["content"]} onSubmit={submitHandler} >
                <label>Title</label>
                <div className={styles["input-wrapper"]}>
                    <BaseInput name="title" onChange={onChangeHandler} value={data.title} />
                </div>

                <label>Description</label>
                <textarea name="description" onChange={onChangeHandler} value={data.description} />

                <div className={styles["btn-wrapper"]}>
                    <BaseButton type="submit" buttonLabel="Submit" />
                </div>

            </form>

        </div>
    )
}