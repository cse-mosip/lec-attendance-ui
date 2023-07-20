import axios from "axios";

const APIEndpoint = process.env.REACT_APP_API_ENDPOINT + "/student";


const markAttendance = async () => {
    const url = APIEndpoint + '/lecture-attendance/mark-lecture-attendance'
    const requestData = { /* your request data */ };
    const response = await axios.post(url, requestData);
    return response;
}

export {
    markAttendance
};