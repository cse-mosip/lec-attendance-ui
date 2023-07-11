import React from "react";
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

const LectureConfig = () => {
  const modules = [
    { code: "CS4012", name: "Professional Practice" },
    { code: "CS3962", name: "Research and Report Writing" },
    { code: "CS4242", name: "Human Computer Interaction" },
  ];

  const lecturers = [
    { id: "1", name: "Dr. ABC Perera" },
    { id: "2", name: "Dr. ABC Perera" },
    { id: "3", name: "Prof. ABC Perera" },
  ];

  const [intake, setIntake] = React.useState("");
  const [semester, setSemester] = React.useState("");
  const [duration, setDuration] = React.useState("");

  const handleChangeIntake = (event) => {
    setIntake(event.target.value);
  };

  const handleChangeSemester = (event) => {
    setSemester(event.target.value);
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
              border: 1,
              borderColor: "#4154F1",
              borderRadius: 1,
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
                Config Lecture
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
                    }}
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
                    }}
                  />
                )}
              />

              <Grid container sx={{ ml: 2}}>
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
                />
              </Grid>

              <Button
                variant="contained"
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  width: "auto",
                  backgroundColor: "#4154F1",
                  ml: 2,
                }}
                fullWidth
                // onClick={}
              >
                PROCEED
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default LectureConfig;
