import axios from "axios";
import { DOMAIN_NAME } from "../config.js"

const APIEndpoint = DOMAIN_NAME+ "/admin";
const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiQXR0ZW5kYW5jZVNlcnZpY2UiLCJhdWQiOiJBdHRlbmRhbmNlRnJvbnRlbmRzIiwiaWF0IjoxNjkxNjU5NTMwLCJleHAiOjE2OTE2NjMxMzAsIm5iZiI6MTY5MTY1OTUyOSwidXNlcl90eXBlIjoiMSJ9.bkB00xTQ_uX_ffaEqcvKiFgZpZU5cTtgCIaiZAaTGLcKshYWfam2BA8scmw2sZ730JT_98MFuiXA4PrHG5lQYg"



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

        // login details content
        // {
            // grant_type: "password",
            // username: "admin",
            // password: "admin",
        //}
    });
    
    return response;
}

export {
    configLectureDetails,
    endLecture,
    adminLogin,
    getAllHalls
};
