import * as api from "./api.jsx"


const endPoints = {

    //noteGroups
    createNoteGroup: "noteGroups/create",
    getNoteGroups: "noteGroups",

    //notes
    getAllNotes: (groupId) => `notes/${groupId}`,
    createNote: (groupId) => `notes/create/${groupId}`,
    editNote: (itemId) => `notes/edit/${itemId}`,
    deleteNote: (itemId) => `notes/${itemId}`,
    //noteDetails: (itemId) => `items/getItem/${itemId}`,

    //users
    usersRegister: "users/register",
    usersLogin: "users/login",
    userProfile: "users/profile",    
}



//users
export const userRegister =  (body) => {
    return api.post(endPoints.usersRegister, body)
}

export const userLogin = (body) => {
    return api.post(endPoints.usersLogin, body)
}

export const userProfile = () => {
    return api.get(endPoints.userProfile)
}


//note groups
export const createNoteGroup = (body) => {
    return api.post(endPoints.createNoteGroup, body)
}

export const getAllNoteGroups = () => {
    return api.get(endPoints.getNoteGroups)
}



//notes
export const getAllNotes = (id) => {
    return api.get(endPoints.getAllNotes(id))
}

export const createNote = (id, body) => {
    return api.post(endPoints.createNote(id), body)
}

export const editNote = (id, body) => {
    return api.post(endPoints.editNote(id), body)
}

export const deleteNote = (id) => {
    return api.del(endPoints.deleteNote(id))
}


// export const getNoteById = (id, body) => {
//     return api.get(endPoints.createItem, body)
// }

// export const getItemDetails = (id) => {
//     return api.get(endPoints.adminItem(id))
// }