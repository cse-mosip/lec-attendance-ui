import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import error from './assets/error.png';

export default function ErrorDisplay() {
    return (
        <>
            <Container sx={{display: 'flex',  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}} maxWidth="xl">
                <Typography align="center" variant="h1">Unsuccessful attempt</Typography>
                <Typography align="center" variant="h2">Please try again</Typography>
                <Box align='center'>
                    <img width='40%' src={error}></img>
                </Box>
            </Container>
        </>
    )
}