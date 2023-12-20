
import styles from "./AddNoteModal.module.css"
import { useState } from "react"

import { BaseInput } from "../../../../components/BaseInput/BaseInput"
import { BaseButton } from "../../../../components/BaseButton/BaseButton"

import { createNote } from "../../../../api/requests"

import { errorNotification, NotesNotifications } from "../../../../utilities/Notifications"

import {useParams} from "react-router-dom"

export const AddNoteModal = ({closeModal, setNotes}) => {

    const {groupId} = useParams()

    const [data, setData] = useState({
        title: "",
        description: ""
    })

    const onChangeHandler = (e) => {
        setData((prevState) => ({...prevState, [e.target.name]: e.target.value }));
      };

    const submitHandler = async (e) => {
        e.preventDefault()

        if(!data.title || !data.description){
            NotesNotifications.emptyFields();
            return;
        }

        const notes = await createNote(groupId, data)
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