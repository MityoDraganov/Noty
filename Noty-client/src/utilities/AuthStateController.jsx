
//future implementation --> save authData
export const setAuth = (authData) => {
    localStorage.setItem("auth", JSON.stringify(authData))
}

export const clearAuth = () => {
    localStorage.removeItem("auth")
}

export const readData = () => {
    return localStorage.getItem("auth")
}