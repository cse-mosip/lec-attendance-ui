import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Fingerprint from './assets/Fingerprint.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import socket from '../../../services/FingerScanSocket';
import Button from '@mui/material/Button';
import { endLecture } from '../../../services/AdminServices';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { red } from '@mui/material/colors';
import { color } from '@mui/system';

export default function IdleDisplay(props) {

    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        iconColor: "green",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 5000,
      });

    const navigate = useNavigate();
    useEffect(() => {
        // Listen for events
        socket.on('fingerprintData', (data) => {
          console.log('Received data:', data);
          props.onScanHandler(data);
        });
    });

    const requestFingerPrint = () => {
        socket.emit("fingerprint", 3);
    }

    const endLec = () => {
        endLecture(props.lectureId);
        navigate("/lecture-config");
        Toast.fire({
            icon: "success",
            title: "Success",
            text: "Lecture Ended successfully",
          });
    }

    return (
        <>
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
             <Grid item xs={3}>
                <Card sx={{display: 'inline-block', boxShadow: 3, backgroundColor: "#" }}>
                    <CardContent>
                        <Container sx={{display: 'flex',  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'auto'}}>
                            <Typography align="center" variant="h2">{props.moduleCode} | {props.moduleName}</Typography>
                            <Typography align="center" variant="h2">{props.lecturer}</Typography>
                        </Container>
                        <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto'}}>
                                <img src={Fingerprint}/>
                        </Container>
                        <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography align="left" variant="h3" >Scan your fingerprint to mark your attendance</Typography> 
                        </Container>
                        <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Button variant="contained" sx={{my: 2, margin:1}} onClick={requestFingerPrint}>Scan Fingerprint</Button>
                            <Button color="error" variant="contained" sx={{my: 2}} onClick={endLec}>End Lecture</Button>
                        </Container>
                    </CardContent>
                </Card>
             </Grid>
        </Grid>
        </>
    )
}