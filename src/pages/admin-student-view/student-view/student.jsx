import { useState } from "react";
import IdleDisplay from './IdleDisplay';
import SuccessDisplay from './SuccessDisplay';
import ErrorDisplay from './ErrorDisplay';
import axios from 'axios';

export default function StudentDisplay(props) {
    const [state, setState] = useState("idle");
    const [studentIndex, setStudentIndex] = useState('190000A');
    const [timestamp, setTimestamp] = useState('10:15 AM');

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

    if (state === 'idle') {
        return (     
        <>
            <IdleDisplay moduleCode={props.moduleCode} moduleName={props.moduleName} lecturer={props.lecturer}/>
            <button onClick={markAttendance}>Scan fingerprint</button>
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