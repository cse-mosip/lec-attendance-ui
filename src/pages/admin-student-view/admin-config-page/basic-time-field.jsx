import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";

export default function BasicTimeField(props) {
  const { label, setTime, error } = props;

  const handleChange = (time) => {
    if (time) {
      setTime(new Date(time));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimeField"]}>
        <TimeField error={error} label={label} onChange={handleChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
