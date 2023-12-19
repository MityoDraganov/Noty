
import styles from "./AddNoteGroupModal.module.css"
import { useState } from "react"

import { BaseInput } from "../../../../components/BaseInput/BaseInput"
import { BaseButton } from "../../../../components/BaseButton/BaseButton"

import { createNoteGroup } from "../../../../api/requests"

import { NotesNotifications } from "../../../../utilities/Notifications"

export const AddNoteGroupModal = ({closeModal, setNoteGroups}) => {

    const [data, setData] = useState({
        title: "",
        Visibility: ""
    })

    const onChangeHandler = (e) => {
        setData((prevState) => ({...prevState, [e.target.name]: e.target.value }));
      };

    const submitHandler = async (e) => {
        e.preventDefault()

        const notes = await createNoteGroup(data)
        setNoteGroups(notes)

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

                <label>Visibility</label>
                <select name="visibility" onChange={onChangeHandler} value={data.description}>
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                </select>

                <div className={styles["btn-wrapper"]}>
                    <BaseButton type="submit" buttonLabel="Submit" />
                </div>

            </form>

        </div>
    )
}