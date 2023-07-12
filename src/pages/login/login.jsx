import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Card, Button, Checkbox, Container, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography, InputLabel } from '@mui/material';

const Login = () => {
  // State variables for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState('student');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Logging in as a ${userType} with username: ${username} and password: ${password}`);
  };
  
  return (
    <>
      {/* AppBar for the application name */}
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color:"#012970", marginLeft: '10px', fontWeight: 'bold' }}>
            Attendify
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main container for the login form and system description */}
      <Container maxWidth="false" sx={{ height: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F4FB' }}>
        <Grid container>
          {/* System description */}
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container style={{ width: '80%', padding: '20px' }}>
              <Typography variant="h2" align="center">
                Student Attendance Management System
              </Typography>
              <br />
              <Typography variant="h3" align="center"  sx={{color:"#3C4EF1"}}>
                Lecturer's Platform
              </Typography>
              <br />
              <Typography variant="span" align="left" sx={{color:"#757F8E"}}>
                Welcome to our Student Attendance Management System, a lecturer-focused platform for efficient attendance tracking. Built on the robust MOSIP platform, our system uses biometric fingerprint technology for accurate, tamper-proof attendance collection. Join us in revolutionizing educational attendance management.
              </Typography>
            </Container>
          </Grid>

          {/* Login form */}
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: '70%', padding: '20px', backgroundColor: 'white' }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                gap: '20px',
                padding: '40px', // Add padding here
              }}
            >
              <Typography variant="h4">Sign In</Typography>

                {/* User type selection */}
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <RadioGroup
                    row
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    sx={{
                      '& .MuiFormControlLabel-root': {
                        border: '0px solid',
                        borderRadius: '4px',
                        padding: '10px 60px 10px 20px',
                        margin:'0px 50px 0px 0px'
                      },
                    }}
                  >
                    <FormControlLabel value="student" control={<Radio />} label="Student" />
                    <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                  </RadioGroup>
                </Box>

                {/* Username field */}
                <InputLabel htmlFor="username">Username</InputLabel>
                <TextField
                  id="username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                {/* Password field */}
                <InputLabel htmlFor="password">Password</InputLabel>
                <TextField
                  id="password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Remember me checkbox */}
                <FormControlLabel
                  control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                  label="Remember me"
                />

                {/* Submit button */}
                <Box sx={{ alignSelf: 'flex-start' }}>
                  <Button variant="contained" color="primary" type="submit">
                    Sign In
                  </Button>
                </Box>

                {/* Forgot password link */}
                <Box sx={{ alignSelf: 'flex-start' }}>
                  <Button color="secondary">Forgot Password?</Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
