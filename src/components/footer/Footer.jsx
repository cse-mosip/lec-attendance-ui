import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import './footer.css'


function Footer() {

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://www.mosip.io">
          Visit Our Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <Container
      className='footer'
      maxWidth="md"
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 0,
        py: [3, 6],
      }}
    >
      <Grid container spacing={4} justifyContent="space-evenly">

      </Grid>
      <Copyright sx={{ mt: 2 }} />
    </Container>
  )
}

export default Footer