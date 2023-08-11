import axios from "axios";
import { DOMAIN_NAME } from "../config.js"

const APIEndpoint = DOMAIN_NAME+ "/admin";
const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiQXR0ZW5kYW5jZVNlcnZpY2UiLCJhdWQiOiJBdHRlbmRhbmNlRnJvbnRlbmRzIiwiaWF0IjoxNjkxNzM3MzQ0LCJleHAiOjE2OTE3NDA5NDQsIm5iZiI6MTY5MTczNzM0MywidXNlcl90eXBlIjoiMSJ9.ij4qjr-1aUI4SQy4WplT86bASE8GaldWa-WowQQU8chRXQUIu58qzGszwGBY4rwLzQ2awTebOkPu66TX5cAYCA'



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
