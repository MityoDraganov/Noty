import { clearAuth, readData } from "../utilities/AuthStateController";
import { errorNotification } from "../utilities/Notifications";

const host = process.env.NODE_ENV === 'development' ? "http://localhost:3030/" : "https://noty-server.vercel.app/"

const request = async (method, url, data) => {
    const options = {
        method,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    };
    if (data) {
        options.headers["content-type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    try{
    if(readData()){
        const authData = JSON.parse(localStorage.auth);
        const userToken = authData["authorization-token"]

        if (userToken) {
            options.headers["authorization-token"] = userToken;
          }
    }
    } catch(err){
        clearAuth()
    }

    try {
        const res = await fetch(host + url, options);
        const data = await res.json();
        if (!res.ok) {
            
            throw new Error(data.Message);
        }
        if (res.status === 401) {
            clearAuth()
        }
        return data;
    } catch (error) {

        errorNotification(error.toString())
        throw new Error(error.message);
    }
};

const get = request.bind(null, "GET");
const post = request.bind(null, "POST");
const put = request.bind(null, "PUT");
const patch = request.bind(null, "PATCH");
const del = request.bind(null, "DELETE");

export { get, post, put, patch, del };