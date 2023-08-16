import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Card,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import {styled} from "@mui/system";

const Register = () => {
  // State variables for form fields
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState("student");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Check if passwords match when the user types
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Check if passwords match when the user types
    setPasswordMatch(e.target.value === password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // Passwords match, proceed with form submission or other logic
      console.log("Passwords match:", password);
    } else {
      // Passwords don't match, display an error or provide feedback
      console.log("Passwords do not match");
    }
  };

  const Logo = styled('img')({
    height: '50px',
    marginRight: '16px',
  });

  return (
    <>
      {/* AppBar for the application name */}
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Logo src={`/frontend-service/lec-attendance-ui/images/logo.png`} alt="logo" />
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              color: "#012970",
              marginLeft: "10px",
              fontWeight: "bold",
            }}
          >
            University of Moratuwa
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main container for the login form and system description */}
      <Container
        maxWidth="false"
        sx={{
          height: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F0F4FB",
          top: "60px",
          left: 0,
          width: "100%",
          backgroundImage: `url(/frontend-service/lec-attendance-ui/images/uom3.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      >
        <Grid container>
          {/* System description */}
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Container style={{ width: "80%", padding: "20px" }}>
              <Typography variant="h2" align="center" sx={{ color: "#FFFFFF" , fontWeight: "bold"}}>
                Student Attendance Management System
              </Typography>
              <br />
              <Typography variant="span" align="left" sx={{ color: "rgba(255,255,255,0.8)" }}>
                Welcome to our Student Attendance Management System, a
                lecturer-focused platform for efficient attendance tracking.
                Built on the robust MOSIP platform, our system uses biometric
                fingerprint technology for accurate, tamper-proof attendance
                collection. Join us in revolutionizing educational attendance
                management.
              </Typography>
            </Container>
          </Grid>

          {/* Login form */}
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              style={{
                width: "70%",
                padding: "20px",
                backgroundColor: "white",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  gap: "20px",
                  padding: "20px", // Add padding here
                }}
              >
                <Typography variant="h4">Register</Typography>

                {/* User type selection */}
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <RadioGroup
                    row
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        border: "0px solid",
                        borderRadius: "4px",
                        padding: "10px 60px 10px 20px",
                        margin: "0px 50px 0px 0px",
                      },
                    }}
                  >
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                    />
                    <FormControlLabel
                      value="lecturer"
                      control={<Radio />}
                      label="Lecturer"
                    />
                  </RadioGroup>
                </Box>

                <Box sx={{ display: "flex", gap: "10px" }}>
                  {/* Firstname field */}
                  <TextField
                    label="First Name"
                    size="small"
                    id="firstname"
                    variant="outlined"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  {/* Lastname field */}
                  <TextField
                    label="Last Name"
                    size="small"
                    id="lastname"
                    variant="outlined"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Box>

                <Box sx={{ display: "flex", gap: "10px" }}>
                  {/* Email addres field */}
                  <TextField
                    label="E-mail"
                    size="small"
                    id="emailaddress"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* Username field */}
                  <TextField
                    label="User Name"
                    size="small"
                    id="lastname"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Box>

                <Box sx={{ display: "flex", gap: "10px" }}>
                  {/* Password field */}
                  <TextField
                    label="Password"
                    size="small"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordChange}
                    error={!passwordMatch}
                    helperText={!passwordMatch && "Passwords do not match"}
                  />
                  <TextField
                    label="Confirm Password"
                    size="small"
                    id="confirmpassword"
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!passwordMatch}
                  />
                </Box>

                {/* Submit button */}
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#4154F1" }}
                    type="submit"
                  >
                    Register
                  </Button>
                  <Box sx={{ flexGrow: 1 }} />
                  <Box alignItems="center" sx={{ display: "flex" }}>
                    <Typography>Already have an account?</Typography>
                    <Link to="/login">
                        <Typography> Sign In</Typography>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Register;
