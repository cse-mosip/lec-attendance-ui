import axios from "axios";
import { DOMAIN_NAME } from "../config.js"

const APIEndpoint = DOMAIN_NAME+ "/admin";
const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiQXR0ZW5kYW5jZVNlcnZpY2UiLCJhdWQiOiJBdHRlbmRhbmNlRnJvbnRlbmRzIiwiaWF0IjoxNjkxNjY5NzM4LCJleHAiOjE2OTE2NzMzMzgsIm5iZiI6MTY5MTY2OTczNywidXNlcl90eXBlIjoiMSJ9.AES3NeNPZUGBOxzKqgL6Gd0Ha5Pm7zUlDEYK_UfkIxVT7K137cKoIKuuleydnMnQpwl0Tbkx8VSozBkv0hPeMQ'
const currentLectureDetails = async() => {

    const response = await axios ({
        method : "GET",
        url : APIEndpoint + "/lecture/getCurrentLectures",
        headers : {
            'Access-Token' : accessToken
        }
    })

    return response;
}

export { currentLectureDetails }
