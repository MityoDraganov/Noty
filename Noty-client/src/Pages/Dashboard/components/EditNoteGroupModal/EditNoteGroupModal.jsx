
import styles from "./EditNoteGroupModal.module.css"
import { useState } from "react"

import { BaseInput } from "../../../../components/BaseInput/BaseInput"
import { BaseButton } from "../../../../components/BaseButton/BaseButton"

import { editNote } from "../../../../api/requests"

import {NotesNotifications} from "../../../../utilities/Notifications"

export const EditNoteGroupModal = ({closeModal, setNotes, title, description, _id}) => {

    const [data, setData] = useState({
        title: title,
        description: description
    })

    const onChangeHandler = (e) => {
        setData((prevState) => ({...prevState, [e.target.name]: e.target.value }));
      };

    const submitHandler = async (e) => {
        e.preventDefault()

        


        const notes = await editNote(_id, data)
        await setNotes(notes)

        NotesNotifications.editNoteSuccess();
        closeModal()
    }

    return (
        <div className={styles["container"]}>
            <h1>Edit note</h1>

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