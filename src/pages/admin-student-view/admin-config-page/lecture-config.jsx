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
  Snackbar,
} from "@mui/material";
import axios from "axios";
import ErrorSnackbar from "./error-snackbar";
import BasicTimeField from "./basic-time-field";

const LectureConfig = () => {
  const [intake, setIntake] = useState("");
  const [semester, setSemester] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [modules, setModules] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [showSnackbar, setShowSnackbar] = useState(false);

  const [intakeError, setIntakeError] = useState(false);
  const [semesterError, setSemesterError] = useState(false);
  const [lecturerError, setLecturerError] = useState(false);
  const [moduleError, setModuleError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);
  const [validationError, setValidationError] = useState("");

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

  const handleProceed = () => {
    setIntakeError(false);
    setSemesterError(false);
    setLecturerError(false);
    setModuleError(false);
    setStartTimeError(false);
    setEndTimeError(false);
    setValidationError("");

    if (
      !intake ||
      !semester ||
      !lecturer ||
      !moduleName ||
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
    } else {
      if (startTime.getTime() >= endTime.getTime()) {
        setValidationError("Start time should be before end time");
      } else {
        // POST REQUEST
      }
    }
  };

  const handleGetDetails = () => {
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
          } else {
            console.error(data.reason);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
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

              {intakeError || semesterError || moduleError || lecturerError ? (
                <ErrorSnackbar
                  error={true}
                  errorMessage="Please fill out required fields"
                />
              ) : null}
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
  );
};

export default LectureConfig;
