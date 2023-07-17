import React, { useState } from 'react';
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
    const data = [
        {
            "lec id": 1,
            "module code": "CS4545",
            "module name": "Data Visualization",
            "hall": "Level 1 Lab",
            "date": "2015-12-11",
            "start-time": "08:00",
            "end-time": "10:00",
            "Attendance": "12/16"
        },
        {
            "lec id": 2,
            "module code": "CS1234",
            "module name": "Database Systems",
            "hall": "Lecture Hall 1",
            "date": "2015-12-15",
            "start-time": "10:30",
            "end-time": "12:30",
            "Attendance": "100/128"
        },
        {
            "lec id": 3,
            "module code": "CS5678",
            "module name": "Machine Learning",
            "hall": "Insight Lab",
            "date": "2015-12-18",
            "start-time": "14:00",
            "end-time": "16:00",
            "Attendance": "20/22"
        },
        {
            "lec id": 4,
            "module code": "CS9999",
            "module name": "Artificial Intelligence",
            "hall": "AI Lab",
            "date": "2015-12-19",
            "start-time": "09:00",
            "end-time": "11:00",
            "Attendance": "18/20"
        },
        {
            "lec id": 5,
            "module code": "CS2222",
            "module name": "Computer Networks",
            "hall": "Networking Lab",
            "date": "2015-12-20",
            "start-time": "13:30",
            "end-time": "15:30",
            "Attendance": "25/30"
        },
        {
            "lec id": 6,
            "module code": "CS3333",
            "module name": "Software Engineering",
            "hall": "Software Lab",
            "date": "2015-12-21",
            "start-time": "11:00",
            "end-time": "13:00",
            "Attendance": "22/25"
        },
        {
            "lec id": 7,
            "module code": "CS4444",
            "module name": "Operating Systems",
            "hall": "OS Lab",
            "date": "2015-12-22",
            "start-time": "14:00",
            "end-time": "16:00",
            "Attendance": "15/18"
        },
        {
            "lec id": 8,
            "module code": "CS5555",
            "module name": "Data Structures",
            "hall": "DS Lab",
            "date": "2015-12-23",
            "start-time": "10:00",
            "end-time": "12:00",
            "Attendance": "19/20"
        },
        {
            "lec id": 9,
            "module code": "CS6666",
            "module name": "Algorithms",
            "hall": "Algo Lab",
            "date": "2015-12-24",
            "start-time": "09:30",
            "end-time": "11:30",
            "Attendance": "15/16"
        },
        {
            "lec id": 10,
            "module code": "CS7777",
            "module name": "Web Development",
            "hall": "Web Lab",
            "date": "2015-12-28",
            "start-time": "13:00",
            "end-time": "15:00",
            "Attendance": "28/30"
        },
        {
            "lec id": 11,
            "module code": "CS8888",
            "module name": "Computer Graphics",
            "hall": "Graphics Lab",
            "date": "2015-12-30",
            "start-time": "14:30",
            "end-time": "16:30",
            "Attendance": "17/20"
        }
    ];
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
    const [selectedTotStudent, setSelectedTotStudent] = useState(0);

    const [show, setShow] = useState(false);
    const showModal = (entry) => {
        setShow(true);

        let totalStudents = entry.Attendance.split("/")[1];

        setSelectedTotStudent(totalStudents);

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
        <LectureInfoModal presentStudents={dummyData} totalStudents={selectedTotStudent} show={show} setShow={(bool) => setShow(bool)}/>
        </>
    );
}

export default AttendanceSheet;
