import React, { useState, useEffect } from "react";
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
  Snackbar,
} from "@mui/material";
import axios from "axios";
import ErrorSnackbar from "./error-snackbar";
import BasicTimeField from "./basic-time-field";
import { useNavigate } from "react-router-dom";
import SideNav from "../../../components/navbar/SideNav";
import Swal from "sweetalert2";
import { getAllHalls } from "../../../services/AdminServices";


const LectureConfig = () => {
  const [disableProceed, setDisableProceed] = useState(true);
  const [intake, setIntake] = useState("");
  const [semester, setSemester] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [hall, setHall] = useState("");
  const [modules, setModules] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [halls, setHalls] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [showSnackbar, setShowSnackbar] = useState(false);

  const [intakeError, setIntakeError] = useState(false);
  const [semesterError, setSemesterError] = useState(false);
  const [lecturerError, setLecturerError] = useState(false);
  const [moduleError, setModuleError] = useState(false);
  const [hallError, setHallError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);
  const [validationError, setValidationError] = useState("");

  
  useEffect(() => {
    getHalls()
  }, [])
  
  
  const getHalls = async () => {
    try{
    const response=await getAllHalls()
    setHalls(response.data.data)
  }
    catch{
      console.log("error");
    }
}

  const errorToast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    iconColor: "red",
    showConfirmButton: false,
    timerProgressBar: true,
    background: "#efafaf"
  });

  const navigate = useNavigate();

  const handleChangeIntake = (event) => {
    const selectedIntake = event.target.value;
    setIntake(selectedIntake);
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

  const handleChangeHall = (event) => {
    const selectedHall = event.target.value;
    setHall(selectedHall);
  }

  const handleProceed = () => {
    setIntakeError(false);
    setSemesterError(false);
    setLecturerError(false);
    setModuleError(false);
    setHallError(false);
    setStartTimeError(false);
    setEndTimeError(false);
    setValidationError("");

    if (
      !intake ||
      !semester ||
      !lecturer ||
      !moduleName ||
      !hall ||
      !startTime ||
      !endTime
    ) {
      if (intake == "") {
        setIntakeError(true);
      }
      if (semester == "") {
        setSemesterError(true);
      }
      if (lecturer == "") {
        setLecturerError(true);
      }
      if (moduleName == "") {
        setModuleError(true);
      }
      if (startTime == "") {
        setStartTimeError(true);
      }
      if (endTime == "") {
        setEndTimeError(true);
      }
      errorToast.fire({
        icon: "error",
        title: "Error",
        text: "Please fill out required fields",
      });
    } else {
      if (startTime.getTime() >= endTime.getTime()) {
        setValidationError("Start time should be before end time");
      } else {
        // POST REQUEST

        // go to student view using the data recieved from post request
        navigate("/student-view", {
          state: {
            moduleCode: "CS1023",
            moduleName: "Human Computer Interaction",
            lecturer: "Prof. Indika Perera",
          },
        });
      }
    }
    // temp: remove this code later
    // go to student view using the data recieved from post request
    // navigate ('/student-view',
    //   {state: {
    //     moduleCode: 'CS1023',
    //     moduleName: 'Human Computer Interaction',
    //     lecturer: 'Prof. Indika Perera'
    //   }}
    //   );
  };

  const handleGetDetails = () => {
    console.log("halls",halls)
    setIntakeError(false);
    setSemesterError(false);

    if (!intake || !semester) {
      if (intake == "") {
        setIntakeError(true);
      }
      if (semester == "") {
        setSemesterError(true);
      }
      errorToast.fire({
        icon: "error",
        title: "Error",
        text: "Please fill out required fields",
      });
    } else {
      if (intake && semester) {
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
              setDisableProceed(false);
            } else {
              console.error(data.reason);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <SideNav />
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
                boxShadow: "6",
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
                  <Grid item xs={3} sx={{ ml: 2, mb: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Intake
                      </InputLabel>
                      <Select
                        error={intakeError}
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
                  <Grid item xs={3} sx={{ ml: 2, mb: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Semester
                      </InputLabel>
                      <Select
                        error={semesterError}
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
                    onClick={handleGetDetails}
                  >
                    GET DETAILS
                  </Button>
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
                      {option.code}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      error={moduleError}
                      {...params}
                      label="Module Code & Module Name"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                        required: true,
                      }}
                      value={moduleName}
                      onChange={handleChangeModule}
                    />
                  )}
                />

                <Autocomplete
                  id="lecturer-select-demo2"
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
                      error={lecturerError}
                      {...params}
                      label="Lecturer"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                        required: true,
                      }}
                      value={lecturer}
                      onChange={handleChangeLecturer}
                    />
                  )}
                  onChange={(e, value) => {
                    setLecturer(value.name);
                  }}
                />

                  <Autocomplete
                  id="module-select-demo"
                  sx={{ ml: 2, mb: 2 }}
                  options={halls}
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
                      error={hallError}
                      {...params}
                      label="Hall"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                        required: true,
                      }}
                      value={hall}
                      onChange={handleChangeHall}
                    />
                  )}
                />

                <Grid container>
                  <Grid item xs={5} sx={{ ml: 2, mb: 2 }}>
                    <BasicTimeField
                      label={"Start Time"}
                      setTime={setStartTime}
                      error={startTimeError}
                    />
                  </Grid>
                  <Grid item xs={5} sx={{ ml: 2, mb: 2 }}>
                    <BasicTimeField
                      label={"End Time"}
                      setTime={setEndTime}
                      error={endTimeError}
                    />
                  </Grid>
                </Grid>

                {!disableProceed && (
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
                )}

                {/* {intakeError || semesterError || moduleError || lecturerError ? (
                <ErrorSnackbar
                  error={true}
                  errorMessage="Please fill out required fields"
                />
              ) : null} */}
                {validationError && (
                  <ErrorSnackbar error={true} errorMessage={validationError} />
                )}

                <Snackbar
                  open={showSnackbar}
                  autoHideDuration={3000}
                  onClose={handleCloseSnackbar}
                  message="Lecture has been configured successfully."
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default LectureConfig;
