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
import ErrorSnackbar from "./error-snackbar";
import BasicTimeField from "./basic-time-field";

const LectureConfig = () => {
  const modules = [
    { code: "CS4012", name: "Professional Practice" },
    { code: "CS3962", name: "Research and Report Writing" },
    { code: "CS4242", name: "Human Computer Interaction" },
  ];

  const lecturers = [
    { id: "1", name: "Mrs. Vishaka Nanayakkara" },
    { id: "2", name: "Dr. Adeesha Wijayasiri" },
    { id: "3", name: "Prof. Indika Perera" },
  ];

  const [intake, setIntake] = useState("");
  const [semester, setSemester] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [module, setModule] = useState("");
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
    setIntake(event.target.value);
  };

  const handleChangeSemester = (event) => {
    setSemester(event.target.value);
  };

  const handleProceed = () => {
    setIntakeError(false);
    setSemesterError(false);
    setLecturerError(false);
    setModuleError(false);
    setStartTimeError(false);
    setEndTimeError(false);
    setValidationError("");

    if (intake == "") {
      setIntakeError(true);
    }
    if (semester == "") {
      setSemesterError(true);
    }
    if (lecturer == "") {
      setLecturerError(true);
    }
    if (module == "") {
      setModuleError(true);
    }
    if (startTime == "") {
      setStartTimeError(true);
    }
    if (endTime == "") {
      setEndTimeError(true);
    }

    if (startTime.getTime() >= endTime.getTime()) {
      setValidationError("Start time should be before end time");
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
                <Grid item xs={5} sx={{ ml: 2, mb: 2 }}>
                  <FormControl sx={{width: "80%"}}>
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
                <Grid item xs={5} sx={{ ml: 2, mb: 2 }}>
                  <FormControl sx={{width: "80%"}}>
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
                      autoComplete: "new-password", // disable autocomplete and autofill
                      required: true,
                    }}
                  />
                )}
                onChange={(e, value) => {
                  setModule(value.code + " - " + value.name);
                }}
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
                      autoComplete: "new-password", // disable autocomplete and autofill
                      required: true,
                    }}
                  />
                )}
                onChange={(e, value) => {
                  setLecturer(value.name);
                }}
              />

              <Grid container>
                <Grid item xs={5} sx={{ ml: 2, mb: 2 }}>
              <BasicTimeField label={"Start Time"} setTime={setStartTime} error={startTimeError}/>
                </Grid>
                <Grid item xs={5} sx={{ ml: 2, mb: 2 }}>
              <BasicTimeField label={"End Time"} setTime={setEndTime} error={endTimeError}/>
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
              {validationError && 
                <ErrorSnackbar
                  error={true}
                  errorMessage={validationError}
                />
              }

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
