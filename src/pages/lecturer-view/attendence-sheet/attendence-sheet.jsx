import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Link, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import SideNav from "../../../components/navbar/SideNav"


function AttendanceSheet() {
    const data = [
        {
            "module code": "CS4545",
            "module name": "Data Visualization",
            "hall": "Level 1 Lab",
            "date": "2015-12-11",
            "start-time": "08:00",
            "end-time": "10:00",
            "Attendance": "12/16"
        },
        {
            "module code": "CS1234",
            "module name": "Database Systems",
            "hall": "Lecture Hall 1",
            "date": "2015-12-15",
            "start-time": "10:30",
            "end-time": "12:30",
            "Attendance": "100/128"
        },
        {
            "module code": "CS5678",
            "module name": "Machine Learning",
            "hall": "Insight Lab",
            "date": "2015-12-18",
            "start-time": "14:00",
            "end-time": "16:00",
            "Attendance": "20/22"
        },
        {
            "module code": "CS9999",
            "module name": "Artificial Intelligence",
            "hall": "AI Lab",
            "date": "2015-12-19",
            "start-time": "09:00",
            "end-time": "11:00",
            "Attendance": "18/20"
        },
        {
            "module code": "CS2222",
            "module name": "Computer Networks",
            "hall": "Networking Lab",
            "date": "2015-12-20",
            "start-time": "13:30",
            "end-time": "15:30",
            "Attendance": "25/30"
        },
        {
            "module code": "CS3333",
            "module name": "Software Engineering",
            "hall": "Software Lab",
            "date": "2015-12-21",
            "start-time": "11:00",
            "end-time": "13:00",
            "Attendance": "22/25"
        },
        {
            "module code": "CS4444",
            "module name": "Operating Systems",
            "hall": "OS Lab",
            "date": "2015-12-22",
            "start-time": "14:00",
            "end-time": "16:00",
            "Attendance": "15/18"
        },
        {
            "module code": "CS5555",
            "module name": "Data Structures",
            "hall": "DS Lab",
            "date": "2015-12-23",
            "start-time": "10:00",
            "end-time": "12:00",
            "Attendance": "19/20"
        },
        {
            "module code": "CS6666",
            "module name": "Algorithms",
            "hall": "Algo Lab",
            "date": "2015-12-24",
            "start-time": "09:30",
            "end-time": "11:30",
            "Attendance": "15/16"
        },
        {
            "module code": "CS7777",
            "module name": "Web Development",
            "hall": "Web Lab",
            "date": "2015-12-28",
            "start-time": "13:00",
            "end-time": "15:00",
            "Attendance": "28/30"
        },
        {
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

    return (
        <>
        <SideNav/>
        <Container>
            <Typography style={{paddingBottom:"10px"}} variant='h3'>Attendance</Typography>
            <div style={{ marginBottom: '1rem' }}>
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
                        paddingRight:"10px"
                    }}
                />
                <TextField
                    label="Module Name"
                    name="moduleName"
                    value={filters.moduleName}
                    onChange={handleFilterChange}
                    size='small'
                    style={{
                        paddingRight:"10px"
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
                />
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Module Code</TableCell>
                            <TableCell>Module Name</TableCell>
                            <TableCell>Hall</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Attendance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((entry, index) => (
                            <TableRow
                                key={index}
                                component={Link}
                                to={`/details/${entry["module code"]}`}
                                style={{ textDecoration: 'none', cursor: 'pointer' }}
                            >
                                <TableCell>{entry["module code"]}</TableCell>
                                <TableCell>{entry["module name"]}</TableCell>
                                <TableCell>{entry["hall"]}</TableCell>
                                <TableCell>{entry["date"]}</TableCell>
                                <TableCell>{entry["start-time"]}</TableCell>
                                <TableCell>{entry["end-time"]}</TableCell>
                                <TableCell>{entry["Attendance"]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        </>
    );
}

export default AttendanceSheet;
