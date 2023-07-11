import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Fingerprint from './assets/Fingerprint.png';

export default function IdleDisplay(props) {
    return (
        <>
            <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75vh'}} item xs={8}>
                    <Typography align="left" variant="h1">Scan your fingerprint to mark your attendance</Typography>
                </Grid>
                <Grid sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75vh'}} item xs={4}>
                    <img src={Fingerprint}/>
                </Grid>
            </Grid>
            </Container>
            <Container maxWidth="xl">
                <Typography align="left" variant="h4">Module code: {props.moduleCode}</Typography>
                <Typography align="left" variant="h4">Module Name: {props.moduleName}</Typography>
                <Typography align="left" variant="h4">Lecturer Name: {props.lecturer}</Typography>
            </Container>
        </>
    )
}