import axios from "axios";

const BackendAPIEndpoint = process.env.REACT_APP_API_ENDPOINT + "/student";

const markAttendance = async (data) => {
    const url = BackendAPIEndpoint + '/lecture-attendance/mark-lecture-attendance';
    const requestData = data;
    console.log(requestData);
    const response = await axios.post(url, requestData);
    return response;
}

export {
    markAttendance
};