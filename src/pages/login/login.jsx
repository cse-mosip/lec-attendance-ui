import React, { useState } from 'react';
import { AppBar,Toolbar ,Box ,Card, Button, Checkbox, Container, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography, InputLabel } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState('student');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your authentication logic here
    console.log(`Logging in as a ${userType} with username: ${username} and password: ${password}`);
  };

  return (
    <>
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App Name
          </Typography>
        </Toolbar>
      </AppBar>
    <Container maxWidth = "false" sx={{ height: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
      <Grid container>
      <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* <img src={'https://th.bing.com/th/id/OIG.4ru.7oXKu_YmWxZu826T?pid=ImgGn'} alt="Side" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} /> */}
          <Container style={{ width: '80%', padding: '20px' }}>
          <Typography variant="h2" align="center">
                Ateandance
            </Typography>
            <Typography variant="h3" align="center">
                for lectures
            </Typography>
            <br />
            <Typography variant="span" align="left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora at cupiditate quis eum maiores libero veritatis? Dicta facilis sint aliquid ipsum atque?
            </Typography>
            </Container>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card style={{ width: '80%', padding: '20px' }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                gap: '20px',
              }}
            >
              <Typography variant="h4">Sign In</Typography>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                  <RadioGroup
                    row
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    sx={{
                      '& .MuiFormControlLabel-root': {
                        margin:'10px',
                        border: '1px solid lightblue',
                        borderRadius: '4px',
                        padding: '10px',
                      },
                    }}
                  >
                    <FormControlLabel value="student" control={<Radio />} label="Student" />
                    <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                  </RadioGroup>
                </Box>


              <InputLabel htmlFor="username">Username</InputLabel>
                <TextField 
                id="username"
                variant="outlined" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                />

                <InputLabel htmlFor="password">Password</InputLabel>
                <TextField 
                id="password"
                type="password" 
                variant="outlined" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                />
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                label="Remember me"
              />
              <Box sx={{ alignSelf: 'flex-start' }}>
                    <Button variant="contained" color="primary" type="submit">
                    Sign In
                    </Button>
                </Box>
                <Box sx={{ alignSelf: 'flex-start' }}>
                    <Button color="secondary">
                    Forgot Password?
                    </Button>
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
