import { useState } from "react";
import IdleDisplay from './IdleDisplay';
import SuccessDisplay from './SuccessDisplay';
import ErrorDisplay from './ErrorDisplay';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function StudentDisplay(props) {
    const [state, setState] = useState("idle");
    const [studentIndex, setStudentIndex] = useState('190000A');
    const [timestamp, setTimestamp] = useState('10:15 AM');
    const location = useLocation();

    const markAttendance = () => {
        const apiUrl = { /* your-api-endpoint */ };
        const requestData = { /* your request data */ };
        axios.post(apiUrl, requestData)
              .then(response => {
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
    console.log(location.state)

    if (state === 'idle') {
        return (     
        <>
            <IdleDisplay moduleCode={location.state.moduleCode} moduleName={location.state.moduleName} lecturer={location.state.lecturer}/>
            <Box textAlign='center'>
                <Button variant='contained' onClick={markAttendance}>
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