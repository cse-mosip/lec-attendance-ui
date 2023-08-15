import axios from "axios";
import { DOMAIN_NAME } from "../config.js"

const APIEndpoint = DOMAIN_NAME+ "/admin";
const accessToken = localStorage.getItem("AccessToken")

const getAllLectures = async() => {

    const response = await axios ({
        method : "GET",
        url : APIEndpoint + "/lecture/getAllLectures",
        headers : {
            'Access-Token' : accessToken
        }
    })

    return response;
}

export { getAllLectures }