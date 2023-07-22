import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";

import SideNav from "../../components/navbar/SideNav";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Profile = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(null);

  const lecturer = {
    name: "Surangika Ranathunga",
    email: "surangika.19@cse.mrt.ac.lk",
    designation: "Senior lecturer",
    modules: [
      { id: "1", name: "Object oriented programming", code: "cs1033" },
      { id: "2", name: "Object Oriented Software Development", code: "cs1024" },
      { id: "3", name: "Deep learning", code: "cs1024" },
      // Add more modules as needed
    ],
  };

  const handleChangePassword = () => {

    // call to the backend and get the responce , if current password is correct set the iscurrentpassowrd to true
    
    // Check if the current password is correct
    // connect to the backend
    const isCurrentPasswordCorrect = true; 

    if (isCurrentPasswordCorrect) {
      // Password change successful
      setIsPasswordChanged(true);
      setPasswords({ currentPassword: "", newPassword: "" });
    } else {
      // Password change failed
      setIsPasswordChanged(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <Container
        maxWidth="sm"
        sx={{ marginLeft: "auto", marginRight: "auto", mt: 12, mb: 2 , boxShadow:"3"}}
      >
        <Box mt={2}>
          <Avatar sx={{ width: 100, height: 100, margin: "0 auto" }} />
          <Typography variant="h5" align="center" gutterBottom>
            {lecturer.name}
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            {lecturer.designation}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Email: {lecturer.email}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Current Password"
                type={showPassword ? "text" : "password"}
                margin="normal"
                fullWidth
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords((prevPasswords) => ({
                    ...prevPasswords,
                    currentPassword: e.target.value,
                  }))
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="New Password"
                type={showPassword ? "text" : "password"}
                margin="normal"
                fullWidth
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords((prevPasswords) => ({
                    ...prevPasswords,
                    newPassword: e.target.value,
                  }))
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
            fullWidth
          >
            Change Password
          </Button>
          {isPasswordChanged === true && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Password changed successfully!
            </Alert>
          )}
          {isPasswordChanged === false && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Incorrect current password. Please try again.
            </Alert>
          )}
        </Box>
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Modules:
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Module Name</TableCell>
                  <TableCell>Code</TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {lecturer.modules.map((module) => (
                  <TableRow key={module.id}>
                    <TableCell>{module.name}</TableCell>
                    <TableCell>{module.code}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};

export default Profile;
