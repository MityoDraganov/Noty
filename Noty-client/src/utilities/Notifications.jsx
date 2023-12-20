import {toast} from "react-toastify"

export const AuthNotifications = {
    emptyFields: () => errorNotification("All form fields are required!"),
    passwordsDoNotMatch: () => errorNotification("Passwords do not match!"),

    successAuth: () => successNotification("You have successfully been authenticated."),
};

export const PermissionErrorNotifications = {
    notAuthenticatedToEnlist: () => errorNotification("In order to enlist in a course, please first sign in!"),
}
export const NotesNotifications = {
    emptyFields: () => errorNotification("All form fields are required!"),

    createNoteSuccess: () => successNotification("Note successfuly created!"),
    deleteNoteSuccess: () => successNotification("Note successfuly deleted!"),
    editNoteSuccess: () => successNotification("Note successfuly edited!")
}



const defaultNotification = (message) => {
    toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
}

export const errorNotification = (message) => {
    toast.error(message , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
}

const successNotification = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
}