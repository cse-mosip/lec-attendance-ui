import axios from "axios";

const APIEndpoint = process.env.REACT_APP_API_ENDPOINT + "/admin";

const currentLectureDetails = async() => {

    const response = await axios ({
        method : "GET",
        url : APIEndpoint + "/lecture/getCurrentLectures",

    })

    return response;
}
