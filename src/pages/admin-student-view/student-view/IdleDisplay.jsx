import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Fingerprint from './assets/Fingerprint.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import socket from '../../../services/FingerScanSocket';

export default function IdleDisplay(props) {
    useEffect(() => {
        // Listen for events
        socket.on('message', (data) => {
          console.log('Received data:', data);
          props.onScanHandler(data);
        });
    });

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
                    </CardContent>
                </Card>
             </Grid>
        </Grid>
        </>
    )
}
// 4154f1 blue