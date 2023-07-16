import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Autocomplete,
  TextField,
  Box,
  Select,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import MessagePopup from "../../../components/modals/message-pop-up/Message_pop_up";

const LectureConfig = () => {
  const [intake, setIntake] = useState("");
  const [semester, setSemester] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [duration, setDuration] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");
  const [modules, setModules] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  const handleChangeIntake = (event) => {
    const selectedIntake = event.target.value;
    setIntake(selectedIntake);
    axios
      .get("your_backend_url/module-details")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error occurred while fetching data");
        }
      })
      .then((data) => {
        if (data.status === "success") {
          const modulesData = data.data.map((module) => ({
            code: module.module_code,
            name: module.module_name,
          }));
          setModules(modulesData);
          setLecturers(module.data[0].lecturer);
        } else {
          console.error(data.reason);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChangeSemester = (event) => {
    const selectedSemester = event.target.value;
    setSemester(selectedSemester);
  };

  const handleChangeModule = (event, value) => {
    if (value) {
      setModuleCode(value.code);
      setModuleName(value.name);
    } else {
      setModuleCode("");
      setModuleName("");
    }
  };

  const handleChangeLecturer = (event, value) => {
    if (value) {
      setLecturer(value.name);
    } else {
      setLecturer("");
    }
  };

  const handleChangeDuration = (event) => {
    const selectedDuration = event.target.value;
    setDuration(selectedDuration);
  };

  const handleProceed = () => {
    if (
      intake &&
      semester &&
      moduleCode &&
      moduleName &&
      lecturer &&
      duration
    ) {
      setPopupMessage("Lecture has been configured.");
      setPopupType("success");
      setShowPopup(true);
      setIntake("");
      setSemester("");
      setModuleCode("");
      setModuleName("");
      setLecturer("");
      setDuration("");
    } else {
      setPopupMessage("Please fill in all required fields.");
      setPopupType("error");
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="lec-config">
      <Grid
        container
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10} md={5} paddingTop={1}>
          <Card
            sx={{
              alignSelf: "center",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: 8,
            }}
            variant={"outlined"}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  m: 3,
                  color: "#4154F1",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Configure Lecture
              </Typography>

              <Grid container>
                <Grid item xs={5} sx={{ ml: 2, mb: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Intake
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={intake}
                      label="Intake"
                      onChange={handleChangeIntake}
                      required
                    >
                      <MenuItem value={19}>19</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={21}>21</MenuItem>
                      <MenuItem value={22}>22</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={5} sx={{ ml: 2, mb: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Semester
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={semester}
                      label="Semester"
                      onChange={handleChangeSemester}
                      required
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Autocomplete
                id="module-select-demo"
                sx={{ ml: 2, mb: 2 }}
                options={modules}
                autoHighlight
                getOptionLabel={(option) => option.code + " - " + option.name}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.code} - {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Module Code & Module Name"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                      required: true,
                    }}
                    value={moduleName}
                    onChange={handleChangeModule}
                  />
                )}
              />

              <Autocomplete
                id="lecturer-select-demo"
                sx={{ ml: 2, mb: 2 }}
                options={lecturers}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lecturer"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                      required: true,
                    }}
                    value={lecturer}
                    onChange={handleChangeLecturer}
                  />
                )}
              />

              <Grid container sx={{ ml: 2 }}>
                <TextField
                  id="duration"
                  label="Duration (hrs)"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: {
                      min: 0, // Set the minimum value to 0
                    },
                  }}
                  required
                  value={duration}
                  onChange={handleChangeDuration}
                />
              </Grid>

              <Button
                variant="contained"
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  width: "auto",
                  backgroundColor: "#4154F1",
                  ml: "auto",
                  mr: "auto",
                  display: "block",
                }}
                onClick={handleProceed}
              >
                PROCEED
              </Button>

              {showPopup && (
                <MessagePopup
                  message={popupMessage}
                  type={popupType}
                  onClose={handleClosePopup}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default LectureConfig;
