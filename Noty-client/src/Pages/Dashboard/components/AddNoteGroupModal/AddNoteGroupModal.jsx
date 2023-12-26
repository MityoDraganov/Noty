
import styles from "./AddNoteGroupModal.module.css"
import { useState } from "react"

import { BaseInput } from "../../../../components/BaseInput/BaseInput"
import { BaseButton } from "../../../../components/BaseButton/BaseButton"

import { createNoteGroup } from "../../../../api/requests"

import { NoteGroupsNotifications } from "../../../../utilities/Notifications"

export const AddNoteGroupModal = ({ closeModal, setNoteGroups }) => {

    const [data, setData] = useState({
        title: "",
        //visibility: "private"
    })

    const onChangeHandler = (e) => {
        setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!data.title) {
            NotesNotifications.emptyFields();
            return;
        }

        const notes = await createNoteGroup(data)
        setNoteGroups(notes)

        NoteGroupsNotifications.createNoteGroupSuccess()
        closeModal()
    }

    return (
        <div className={styles["container"]}>
            <h1>Add Note Group</h1>

            <form className={styles["content"]} onSubmit={submitHandler} >
                <label>Title</label>
                <div className={styles["input-wrapper"]}>
                    <BaseInput name="title" onChange={onChangeHandler} value={data.title} />
                </div>



                <div className={styles["btn-wrapper"]}>
                    <BaseButton type="submit" buttonLabel="Submit" />
                </div>

            </form>

        </div>
    )
}