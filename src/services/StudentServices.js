import axios from "axios";

const BackendAPIEndpoint = process.env.REACT_APP_API_ENDPOINT + "/student";
const FingerPrintScannerAPIEndpoint = process.env.FINGERPRINT_APP_API_ENDPOINT;

const markAttendance = async (data) => {
    const url = BackendAPIEndpoint + '/lecture-attendance/mark-lecture-attendance';
    const requestData = data;
    console.log(requestData);
    const response = await axios.post(url, requestData);
    return response;
}

const getFingerprint = async () => {
    const url = FingerPrintScannerAPIEndpoint + '/reg/rcapture';
    const requestData = {"deviceSubId":"3"};
    const response = await axios.post(url, requestData);
    return response;
}


export {
    markAttendance,
    getFingerprint
};