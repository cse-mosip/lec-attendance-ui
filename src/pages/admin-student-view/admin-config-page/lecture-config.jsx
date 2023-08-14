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
import AdminSideNav from "../../../components/navbar/AdminSideNav";
import Swal from "sweetalert2";
import {
  configLectureDetails,
  createLecture,
  getAllHalls,
  getAllLecturers,
  getModules,
} from "../../../services/AdminServices";
import { LoadingButton } from "@mui/lab";

const LectureConfig = () => {
  const [disableProceed, setDisableProceed] = useState(true);
  const [intake, setIntake] = useState("");
  const [semester, setSemester] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [hall, setHall] = useState("");
  const [modules, setModules] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [halls, setHalls] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [getDetailsLoading, setGetDetailsLoading] = useState(false);
  const [proceedLoading, setProceedLoading] = useState(false);

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
    getHalls();
    getLecturers();
  }, []);

  const getHalls = async () => {

    try {
      const response = await getAllHalls();
      setHalls(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      errorToast.fire({
        icon: "error",
        title: "Error",
        text: "Error getting lecture halls",
      });
    }
  };

  const getLecturers = async () => {
    try {
      const response = await getAllLecturers();
      if (response.status == 200) {
        console.log(response);
        setLecturers(response.data.data);
      } else {
        errorToast.fire({
          icon: "error",
          title: "Error",
          text: "Error getting lecturers",
        });
      }
    } catch (error) {
      errorToast.fire({
        icon: "error",
        title: "Error",
        text: "Error getting lecturers",
      });
    }
  };

  const errorToast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    iconColor: "red",
    showConfirmButton: false,
    timerProgressBar: true,
    background: "#efafaf",
    timer: 5000,
  });

  const successToast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    iconColor: "green",
    showConfirmButton: false,
    timerProgressBar: true,
    background: "#89e0b3",
    timer: 5000,
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
      setModuleCode(value.moduleCode);
      setModuleName(value.moduleName);
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
  };

  const handleProceed = async () => {
    try {
      setIntakeError(false);
      setSemesterError(false);
      setLecturerError(false);
      setModuleError(false);
      setHallError(false);
      setStartTimeError(false);
      setEndTimeError(false);
      setValidationError("");

      console.log(
        "POST DATA\n",
        courseId,
        new Date(startTime).toISOString().substring(0, 19),
        new Date(endTime).toISOString().substring(0, 19),
        hall,
        lecturer
      );

      if (
        !intake ||
        !lecturer ||
        !moduleName ||
        !hall ||
        !startTime ||
        !endTime ||
        !hall
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
        if (hall == "") {
          setHallError(true);
        }
        errorToast.fire({
          icon: "error",
          title: "Error",
          text: "Please fill out required fields",
        });
      } else {
        if (startTime.getTime() >= endTime.getTime()) {
          errorToast.fire({
            icon: "error",
            title: "Duration Error",
            text: "Start time should be before end time",
          });
        } else {
          setProceedLoading(true);
          const response = await createLecture(
            courseId,
            new Date(startTime).toISOString().substring(0, 19),
            new Date(endTime).toISOString().substring(0, 19),
            10,
            hall,
            lecturer
          );
          console.log("LEC CRT RES", response);
          if (response.data.status === "LECTURE_CREATED_SUCCESSFULLY") {
            // successToast.fire({
            //   icon: "success",
            //   title: "Success",
            //   text: response.data.message,
            // });

            try {
              const uniqueLecId = response.data.data;
              const res = await configLectureDetails(uniqueLecId);
              console.log("LEC STRT RES", res);
              if (res.data.status === 'OK') {
                successToast.fire({
                  icon: "success",
                  title: "Success",
                  text: res.data.message,
                });

              // go to student view using the data recieved from post request
              navigate("/student-view", {
                state: {
                  moduleCode:moduleCode,
                  moduleName:moduleName,
                  lecturer: lecturerName,
                  lectureId:uniqueLecId,
                },
              });

              } else {
                errorToast.fire({
                  icon: "error",
                  title: "Error",
                  text: res.data.message,
                });
              }
            } catch (error) {
              console.log("LEC STRT ERR\n", error);
              errorToast.fire({
                icon: "error",
                title: "Error",
                text: "Error starting the lecture",
              });
            }
          } else {
            errorToast.fire({
              icon: "error",
              title: "Error",
              text: response.data.message,
            });
          }
          setProceedLoading(false);
        }
      }
    } catch (error) {
      console.log("LEC CRT ERR\n", error);
      errorToast.fire({
        icon: "error",
        title: "Error",
        text: "Error creating lecture",
      });
    }
  };

  const handleGetDetails = async () => {
    setIntakeError(false);
    setSemesterError(false);

    if (!intake) {
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
      setGetDetailsLoading(true);
      if (intake) {
        try {
          const response = await getModules(intake);
          if (response.status == 200) {
            if (response.data.length == 0) {
              errorToast.fire({
                icon: "error",
                title: "Error",
                text: "No modules found for the intake",
              });
              setDisableProceed(true);
              setModules([]);
            } else {
              setDisableProceed(false);
              setModules(response.data);
              successToast.fire({
                icon: "success",
                title: "Success",
                text: "Success getting modules",
              });
            }
          } else {
            errorToast.fire({
              icon: "error",
              title: "Error",
              text: "Error getting modules",
            });
          }
        } catch {
          errorToast.fire({
            icon: "error",
            title: "Error",
            text: "Error getting modules",
          });
        }
      }
      setGetDetailsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <AdminSideNav />
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
                  variant="h4"
                  sx={{
                    m: 3,
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  Configure Lecture
                </Typography>

                <Grid container>
                  <Grid item xs={6} sx={{ ml: 2, mb: 2 }}>
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
                  {/* <Grid item xs={3} sx={{ ml: 2, mb: 2 }}>
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
                  </Grid> */}
                  <LoadingButton
                    loading={getDetailsLoading}
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
                  </LoadingButton>
                </Grid>

                <Autocomplete
                  id="module-select-demo"
                  sx={{ ml: 2, mb: 2 }}
                  options={modules}
                  autoHighlight
                  getOptionLabel={(option) =>
                    option.moduleCode + " - " + option.moduleName
                  }
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option.moduleCode} - {option.moduleName}
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
                  onChange={(e, value) => {
                    setModuleCode(value.moduleCode);
                    setModuleName(value.moduleName);
                    setCourseId(value.id);
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
                        autoComplete: "new-password",
                        required: true,
                      }}
                      value={lecturer}
                      onChange={handleChangeLecturer}
                    />
                  )}
                  onChange={(e, value) => {
                    setLecturer(value.id);
                    setLecturerName(value.name);
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
                  onChange={(e, value) => {
                    setHall(value.id);
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

                {!disableProceed && (
                  <LoadingButton
                    loading={proceedLoading}
                    disabled={disableProceed}
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
                  </LoadingButton>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default LectureConfig;
