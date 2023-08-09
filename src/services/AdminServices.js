import axios from "axios";

const APIEndpoint = process.env.REACT_APP_API_ENDPOINT + "/admin";

// Configure the lecture details
const configLectureDetails = async() => {
    
    const response = await axios ({
       method : "POST",
       url : APIEndpoint + "/lecture/start-lecture",

    })

    return response;
}

// start the leacture by admin
const startLecture = async() => {
    
        const response = await axios ({
            method : "GET",
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

export {
    configLectureDetails,
    endLecture,
    adminLogin,
};
