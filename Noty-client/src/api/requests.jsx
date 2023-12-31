import * as api from "./api.jsx"


const endPoints = {

    //noteGroups
    createNoteGroup: "noteGroups/create",
    getNoteGroups: "noteGroups",
    getPermitedNoteGroups: "noteGroups/permitedNoteGroups",
    editNoteGroup: (noteGroupId) => `noteGroups/edit/${noteGroupId}`,
    addUserToGroup: (noteGroupId) => `noteGroups/addUser/${noteGroupId}`,
    deleteUserFromGroup: (noteGroupId) => `noteGroups/deleteUser/${noteGroupId}`,
    removeMyAccess: (noteGroupId) => `noteGroups/removeMyAccess/${noteGroupId}`,


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
    usersSearch: "users/search",

    //notifications
    sendInvite: "notifications/invite/create",
    acceptInvite: "notifications/invite/accept",
    rejectInvite: "notifications/invite/reject",
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

export const usersSearch = (body) => {
    return api.post(endPoints.usersSearch, body)
}

//notifications

export const sendInvite = (body) => {
    return api.post(endPoints.sendInvite, body)
}

export const removeUser = (noteGroupId, body) => {
    return api.post(endPoints.deleteUserFromGroup(noteGroupId), body)
}

export const acceptInvite = (body) => {
    return api.post(endPoints.acceptInvite, body)
}

export const rejectInvite = (body) => {
    return api.post(endPoints.rejectInvite, body)
}


//note groups
export const createNoteGroup = (body) => {
    return api.post(endPoints.createNoteGroup, body)
}

export const getAllNoteGroups = () => {
    return api.get(endPoints.getNoteGroups)
}

export const editNoteGroup = (_id, body) => {
    return api.post(endPoints.editNoteGroup(_id), body)
}



export const deleteUserFromGroup = (body) => {
    return api.post(endPoints.deleteUserFromGroup, body)
}

export const getPermitedNoteGroups = () => {
    return api.get(endPoints.getPermitedNoteGroups)
}

export const removeMyAccess = (noteGroupId) => {
    return api.post(endPoints.removeMyAccess(noteGroupId))
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


