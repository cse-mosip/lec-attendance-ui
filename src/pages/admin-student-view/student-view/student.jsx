import { useState, useEffect } from "react";
import IdleDisplay from './IdleDisplay';
import SuccessDisplay from './SuccessDisplay';
import ErrorDisplay from './ErrorDisplay';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { markAttendance } from "../../../services/StudentServices";
import { useNavigate } from "react-router-dom";

export default function StudentDisplay(props) {
    const navigate = useNavigate();
    const [state, setState] = useState("");
    const [studentIndex, setStudentIndex] = useState('190000A');
    const [timestamp, setTimestamp] = useState('10:15 AM');
    const location = useLocation();
    

    // const fingerprintHandler = () => {
    //     const apiUrl = { /* your-api-endpoint */ };
    //     const requestData = { /* your request data */ };
    //     axios.post(apiUrl, requestData)
    //           .then(response => {
    //             console.log(response.json());
    //             setStudentIndex(response.data.studentIndex);
    //             setTimestamp(response.data.timestamp);
    //             setState('success');
    //             setTimeout(function(){
    //                 setState('idle');
    //             }, 2000);
    //           })
    //           .catch(error => {
    //             setState('success');
    //             setTimeout(function(){
    //                 setState('idle');
    //             }, 2000);
                
    //         });
    // }

    const fingerprintHandler = () => {
        markAttendance().then(response => {
            console.log(response.json());
            setStudentIndex(response.data.studentIndex);
            setTimestamp(response.data.timestamp);
            setState('success');
            setTimeout(function(){
                setState('idle');
            }, 2000);
            })
            .catch(error => {
            setState('success');
            setTimeout(function(){
                setState('idle');
            }, 2000);
            
        });
    }

    useEffect(() => {
        if (location.state==null) {
            navigate("/lecture-config");
        } else {
            setState('idle');
        }
      }, []);

    if (state === 'idle') {
        return (     
        <>
            <IdleDisplay moduleCode={location.state.moduleCode} moduleName={location.state.moduleName} lecturer={location.state.lecturer}/>
            <Box textAlign='center'>
                <Button variant='contained' onClick={fingerprintHandler}>
                    Scan Fingerprint
                </Button>
            </Box>
        </>       
        )
    } else if (state === 'success') {
        return (
           <SuccessDisplay studentIndex={studentIndex} timestamp={timestamp}/>
        )
    } else if (state === 'error')  {
        return (
            <ErrorDisplay/> 
        )
    }
    
}