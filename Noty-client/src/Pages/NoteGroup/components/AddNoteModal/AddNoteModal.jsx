
import styles from "./AddNoteModal.module.css"
import { useState } from "react"

import { BaseInput } from "../../../../components/BaseInput/BaseInput"
import { BaseButton } from "../../../../components/BaseButton/BaseButton"

import { createNote } from "../../../../api/requests"

import { NotesNotifications } from "../../../../utilities/Notifications"

export const AddNoteModal = ({closeModal, setNotes}) => {

    const [data, setData] = useState({
        title: "",
        description: ""
    })

    const onChangeHandler = (e) => {
        setData((prevState) => ({...prevState, [e.target.name]: e.target.value }));
      };

    const submitHandler = async (e) => {
        e.preventDefault()

        const notes = await createNote(data)
        setNotes(notes)

        NotesNotifications.createNoteSuccess()
        closeModal()
    }

    return (
        <div className={styles["container"]}>
            <h1>Add Note</h1>

            <form className={styles["content"]} onSubmit={submitHandler} >
                <label>Title</label>
                <div className={styles["input-wrapper"]}>
                    <BaseInput  name="title" onChange={onChangeHandler} value={data.title}/>
                </div>

                <label>Description</label>
                <textarea name="description" onChange={onChangeHandler} value={data.description}/>

                <div className={styles["btn-wrapper"]}>
                    <BaseButton type="submit" buttonLabel="Submit" />
                </div>

            </form>

        </div>
    )
}