import { useState, useEffect } from "react";
import IdleDisplay from './IdleDisplay';
import SuccessDisplay from './SuccessDisplay';
import ErrorDisplay from './ErrorDisplay';
import {useLocation} from 'react-router-dom';
import { markAttendance } from "../../../services/StudentServices";
import { useNavigate } from "react-router-dom";

export default function StudentDisplay(props) {
    const navigate = useNavigate();
    const [state, setState] = useState("");
    const [studentIndex, setStudentIndex] = useState('190000A');
    const location = useLocation();

    const fingerprintHandler = (fingerData) => {
        markAttendance({...fingerData, eventId:location.state.lectureId}).then(response => {
            console.log(response.json());
            setStudentIndex(response.data.index_number);
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
        })
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
            <IdleDisplay moduleCode={location.state.moduleCode} moduleName={location.state.moduleName} lecturer={location.state.lecturer} lectureId={location.state.lectureId} onScanHandler={fingerprintHandler}/>
        </>       
        )
    } else if (state === 'success') {
        const getCurrentTime = () => {
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            return time;
        }

        return (
           <SuccessDisplay studentIndex={studentIndex} timestamp={getCurrentTime()}/>
        )
    } else if (state === 'error')  {
        return (
            <ErrorDisplay/> 
        )
    }
    
}