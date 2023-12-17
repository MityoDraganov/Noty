import * as api from "./api.jsx"


const endPoints = {

    //notes
    getAllNotes: "notes",
    createNote: "notes/create",
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



//notes
export const getAllNotes = () => {
    return api.get(endPoints.getAllNotes)
}

export const createNote = (body) => {
    return api.post(endPoints.createNote, body)
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
