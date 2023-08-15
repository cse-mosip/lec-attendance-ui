import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Table, TableContainer, TableHead, TableBody, TableRow, Paper, Link, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import SideNav from "../../../components/navbar/SideNav"
import LectureInfoModal from '../../../components/modals/lecture-info/lecture-info-modal';
import dummyData from './attendance_sheet_data.json';
import { borderRadius } from '@mui/system';
import {getAllLectures} from "../../../services/AttendenceSheetService";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));





function AttendanceSheet() {
    const [data, setData] = useState([])

    useEffect(() => {
        getAllLectures().then(res =>  {
            // console.log("getAllLectures then res", res)
            const res_data = res.data.data.map(lecture => {
                const startTime = new Date(lecture.startTime);
                const endTime = new Date(lecture.endTime);
                const attendance = `${lecture.attendance}/${lecture.expectedAttendance}`;

                return {
                    "lec id": lecture.id,
                    "module code": lecture.course.moduleCode,
                    "module name": lecture.course.moduleName,
                    "hall": lecture.hallName,
                    "date": startTime.toISOString().split('T')[0],
                    "start-time": startTime.toISOString().split('T')[1].substr(0, 5),
                    "end-time": endTime.toISOString().split('T')[1].substr(0, 5),
                    "Attendance": attendance,
                    "expectedAttendance": lecture.expectedAttendance,
                    "present": lecture.attendance
                };
            });
            setData(res_data)
        }).catch(res => {
            console.log("getAllLectures catch res", res)
        })
    }, []);

    const initialFilters = {
        moduleCode: '',
        moduleName: '',
        date: '',
    };

    const [filters, setFilters] = useState(initialFilters);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const filteredData = data.filter((entry) => {
        const { moduleCode, moduleName, date } = filters;
        return (
            entry['module code'].includes(moduleCode) &&
            entry['module name'].toLowerCase().includes(moduleName.toLowerCase()) &&
            entry['date'].includes(date)
        );
    });

    const clearFilters = () => {
        setFilters(initialFilters);
    };

    const [selectedRow, setSelectedRow] = useState(null);

    const [show, setShow] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState({});
    const showModal = (entry) => {
        setShow(true);
        setSelectedEntry(entry)


        // TODO: need to add a request handler to get all the lectres conducted by this lecturer

    }

    // const handleRowClick = (index) => {
    //     setSelectedRow(index);
    //     showModal();
    // };

    return (
        <>
            <SideNav/>
            <Container style={{marginTop: '150px'}}>
                <Typography variant='h3'>Attendance</Typography>

                <div style={{ marginBottom: '1rem', position: 'fixed', top: '0', left: "0", paddingTop: '5rem', paddingBottom: '0.25rem', overflow: 'hidden', backgroundColor: '#ffffffee', width: "100%" }}>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: "0 10% 0 10%" }}>
                        <TextField
                            label="Module Code"
                            name="moduleCode"
                            value={filters.moduleCode}
                            onChange={handleFilterChange}
                            size='small'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={clearFilters}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            style={{
                                margin: "0 1rem 0 1rem",
                                border: "0px solid #ccc",
                                borderRadius: 4,
                            }}
                        />
                        <TextField
                            label="Module Name"
                            name="moduleName"
                            value={filters.moduleName}
                            onChange={handleFilterChange}
                            size='small'
                            style={{
                                margin: "0 1rem 0 1rem",
                                border: "0px solid #ccc",
                                borderRadius: 4,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={clearFilters}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Date"
                            name="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                            size='small'
                            style={{
                                margin: "0 1rem 0 1rem",
                                border: "0px solid #ccc",
                                borderRadius: 4,
                            }}
                        />
                    </div>
                </div>
                <div style={{width: '100%'}}>


                    <TableContainer component={Paper} style={
                        {
                            borderRadius: "10px",
                            marginTop: '4.5rem',
                            boxShadow: '-0.5px 0.5px 10px'

                        }
                    }>
                        <Table style={{
                            width: "100%"
                        }}>
                            <TableHead>
                                <TableRow >
                                    <StyledTableCell >Module Code</StyledTableCell >
                                    <StyledTableCell >Module Name</StyledTableCell >
                                    <StyledTableCell >Hall</StyledTableCell >
                                    <StyledTableCell >Date</StyledTableCell >
                                    <StyledTableCell >Start Time</StyledTableCell >
                                    <StyledTableCell >End Time</StyledTableCell >
                                    <StyledTableCell >Attendance</StyledTableCell >
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.map((entry, index) => (
                                    <StyledTableRow
                                        key={entry["lec id"]}
                                        component={Link}
                                        to={`/details/${entry["module code"]}`}
                                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                                        onClick={() => showModal(entry)}
                                    >
                                        <StyledTableCell >{entry["module code"]}</StyledTableCell >
                                        <StyledTableCell >{entry["module name"]}</StyledTableCell >
                                        <StyledTableCell >{entry["hall"]}</StyledTableCell >
                                        <StyledTableCell >{entry["date"]}</StyledTableCell >
                                        <StyledTableCell >{entry["start-time"]}</StyledTableCell >
                                        <StyledTableCell >{entry["end-time"]}</StyledTableCell >
                                        <StyledTableCell >{entry["Attendance"]}</StyledTableCell >
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </div>

            </Container>
            <LectureInfoModal show={show} setShow={(bool) => setShow(bool)} lectureData={selectedEntry}/>
        </>
    );
}

export default AttendanceSheet;
