import axios from "axios";
import { DOMAIN_NAME } from "../config.js"

const APIEndpoint = DOMAIN_NAME+ "/admin";
const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiQXR0ZW5kYW5jZVNlcnZpY2UiLCJhdWQiOiJBdHRlbmRhbmNlRnJvbnRlbmRzIiwiaWF0IjoxNjkxNjY5NzM4LCJleHAiOjE2OTE2NzMzMzgsIm5iZiI6MTY5MTY2OTczNywidXNlcl90eXBlIjoiMSJ9.AES3NeNPZUGBOxzKqgL6Gd0Ha5Pm7zUlDEYK_UfkIxVT7K137cKoIKuuleydnMnQpwl0Tbkx8VSozBkv0hPeMQ"



const configLectureDetails = async() => {
    
    const response = await axios ({
       method : "POST",
       url : APIEndpoint + "/lecture/start-lecture",

    })

    return response;
}

// end lecture
const endLecture = async() => {

    const response = await axios ({
        method : "POST",
        url : APIEndpoint + "/lecture/end-lecture",
    })

    return response;
}

// admin login
const adminLogin = async (loginDetails) => {
  
    const response = await axios({
        method: "POST",
        url: APIEndpoint + "/login",
        data: loginDetails,

        // login details content
        // {
            // grant_type: "password",
            // username: "admin",
            // password: "admin",
        //}
    });
    
    return response;
}

const getAllHalls = async () => {
  
    const response = await axios({
        method: "POST",
        url: APIEndpoint + "/hall/getAllHalls",
        data: {},
        headers: {
            'Access-Token': accessToken
        }
    });
    
    return response;
}

export {
    configLectureDetails,
    endLecture,
    adminLogin,
    getAllHalls
};
