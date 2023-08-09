import { useState, useEffect } from "react";
import IdleDisplay from './IdleDisplay';
import SuccessDisplay from './SuccessDisplay';
import ErrorDisplay from './ErrorDisplay';
import {useLocation} from 'react-router-dom';
import { markAttendance, getFingerprint } from "../../../services/StudentServices";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function StudentDisplay(props) {
    const [active, setActive] = useState(true);
    const navigate = useNavigate();
    const [state, setState] = useState("");
    const [studentIndex, setStudentIndex] = useState('190000A');
    const location = useLocation();
    
    const errorToast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        iconColor: "red",
        showConfirmButton: false,
        timerProgressBar: true,
        background: "#efafaf",
        timer: 2000
    });

    const MAX_RETRIES = 20;

    const fingerprintHandler = () => {
        var timesRun = 0;
        setActive(false);
        var interval = setInterval(function(){
            timesRun += 1;
            if(timesRun === MAX_RETRIES){
                clearInterval(interval);
                setActive(true);
                errorToast.fire({
                    icon: "error",
                    title: "Error",
                    text: "Reading fingerprint failed",
                });
            }
            getFingerprint().then(fingerData => {
                markAttendance(fingerData).then(response => {
                    console.log(response.json());
                    setStudentIndex(response.data.studentIndex);
                    setState('success');
                    setTimeout(function(){
                        setState('idle');
                        setActive(true);
                        clearInterval(interval);
                    }, 2000);
                    })
                    .catch(error => {
                    setState('success');
                    setTimeout(function(){
                        setState('idle');
                        setActive(true);
                        clearInterval(interval);
                    }, 2000);
                })
            }).catch(error => {});
        }, 200)
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
            <IdleDisplay moduleCode={location.state.moduleCode} moduleName={location.state.moduleName} lecturer={location.state.lecturer} active={active} onclickHandler={fingerprintHandler}/>
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