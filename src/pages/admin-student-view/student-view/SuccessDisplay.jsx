import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import success from './assets/success.png';

export default function SuccessDisplay(props) {
    return (
        <>
            <Container sx={{display: 'flex',  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}} maxWidth="xl">
                <Typography align="center" variant="h1">Attendance marked successfully</Typography>
                <Typography align="Center" variant="h4">Student Index: {props.studentIndex}</Typography>
                <Typography align="Center" variant="h4">Recorded Time: {props.timestamp}</Typography>
                <Box align='center'>
                    <img width='20%' src={success}></img>
                </Box>
            </Container>
        </>
    )
}