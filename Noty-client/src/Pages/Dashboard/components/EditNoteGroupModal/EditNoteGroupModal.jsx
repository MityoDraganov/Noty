
import styles from "./EditNoteGroupModal.module.css"
import { useState } from "react"

import { BaseInput } from "../../../../components/BaseInput/BaseInput"
import { BaseButton } from "../../../../components/BaseButton/BaseButton"

import { editNote, editNoteGroup } from "../../../../api/requests"

import {NotesNotifications} from "../../../../utilities/Notifications"

export const EditNoteGroupModal = ({closeModal, setNoteGroups, title, visibility, _id}) => {

    const [data, setData] = useState({
        title: title,
        visibility: visibility
    })

    const onChangeHandler = (e) => {
        setData((prevState) => ({...prevState, [e.target.name]: e.target.value }));
      };

    const submitHandler = async (e) => {
        e.preventDefault()

        if(!data.title || !data.visibility){
            NotesNotifications.emptyFields();
            return;
        }        


        const updatedNoteGroup = await editNoteGroup0(_id, data);

        setNoteGroups((prevNotes) =>
            prevNotes.map((note) => (note._id === _id ? updatedNoteGroup : note))
        );

        NotesNotifications.editNoteSuccess();
        closeModal()
    }

    return (
        <div className={styles["container"]}>
            <h1>Edit Note Group</h1>

            <form className={styles["content"]} onSubmit={submitHandler} >
                <label>Title</label>
                <div className={styles["input-wrapper"]}>
                    <BaseInput  name="title" onChange={onChangeHandler} value={data.title}/>
                </div>

                <label>Visibility</label>
                <select name="visibility" onChange={onChangeHandler} value={data.visibility}>
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