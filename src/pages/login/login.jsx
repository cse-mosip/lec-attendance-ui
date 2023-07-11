import React, { useState } from 'react';
import { AppBar,Toolbar ,Box ,Card, Button, Checkbox, Container, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';

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
    {/* <Container maxWidth = "false"> */}
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App Name
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
      <Grid item xs={6}>
          <img src={'https://th.bing.com/th/id/OIG.4ru.7oXKu_YmWxZu826T?pid=ImgGn'} alt="Side" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card style={{ width: '80%', padding: '20px' }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <Typography variant="h4">Sign In</Typography>
              <RadioGroup row value={userType} onChange={(e) => setUserType(e.target.value)}>
                <FormControlLabel value="student" control={<Radio />} label="Student" />
                <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
              </RadioGroup>
              <TextField 
                label="Username" 
                variant="outlined" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              <TextField 
                label="Password" 
                type="password" 
                variant="outlined" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                label="Remember me"
              />
              <Button variant="contained" color="primary" type="submit">
                Sign In
              </Button>
              <Button color="secondary">
                Forgot Password?
              </Button>
            </Box>
          </Card>
        </Grid>
        
      </Grid>
      {/* </Container> */}
      </>
    
  );
};

export default Login;
