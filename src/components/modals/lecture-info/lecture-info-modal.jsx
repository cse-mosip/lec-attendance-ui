import React, {useEffect, useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import {getStudentByLectureID} from "../../../services/AttendenceSheetService";

const style = {
    modalBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #0394fc',
        boxShadow: 24,
        borderRadius: '10px',
        p: 4,
    },
    lectureDetails: {
        textAlign: 'center'
    },
    pieChartBox : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '20px'
    },
    attendanceSheetTitle: {
        textAlign: 'center',
        marginTop: '20px'
    },
    attendanceSheet: {
        bgcolor: 'blue'
    }
};

function LectureInfoModal(props) {
    // const [open, setOpen] = React.useState(props.show);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => props.setShow(false);
    const lectureData = props.lectureData;
    const presentStudent = lectureData.present
    const totalStudent = lectureData.expectedAttendance;
    const lectureID = lectureData['lec id'];
    const [studentDetails, setStudentDetails] = useState([]);

    useEffect(() => {
        getStudentByLectureID(lectureID).then(res => {
            const res_data = res.data.data.map(student => {
                return {
                    "id": student.index_no,
                    "name": student.student_name,
                    "arrivalTime": student.arrival_time
                };
            });
            setStudentDetails(res_data)
            console.log("studentDetails", res_data)

        }).catch(res => {
            console.log("student catch", res)
        })
    }, [lectureID]);

    const columns = [
        {
            width: 200,
            label: 'Name',
            dataKey: 'name',
        },
        {
            width: 120,
            label: 'Index number',
            dataKey: 'id',
            numeric: true,
        },
        {
            width: 120,
            label: 'Arrival time',
            dataKey: 'arrivalTime',
        },
    ];

    const VirtuosoTableComponents = {
        Scroller: React.forwardRef((props, ref) => (
            <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props) => (
            <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
        ),
        TableHead,
        TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
        TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
    };

    function fixedHeaderContent() {
        return (
            <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        variant="head"
                        align={column.numeric || false ? 'right' : 'left'}
                        style={{ width: column.width }}
                        sx={{
                            backgroundColor: 'background.paper',
                        }}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        );
    }

    function rowContent(_index, row) {
        return (
            <React.Fragment>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        align={column.numeric || false ? 'right' : 'left'}
                    >
                        {row[column.dataKey]}
                    </TableCell>
                ))}
            </React.Fragment>
        );
    }

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.show}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.show}>
                    <Box sx={style.modalBox}>
                        <Box sx={style.lectureDetails}>
                            <Typography variant="h5" component="h2" style={style.transitionModalTitle}>
                                {lectureData['module name']}
                            </Typography>
                            <Typography variant="h6" component="h2" style={style.transitionModalDate}>
                                {lectureData['date']}
                            </Typography>
                        </Box>
                        <Box style={style.pieChartBox} >
                            <PieChart
                                series={[
                                    {
                                        arcLabel: (item) => `${item.value}`,
                                        arcLabelMinAngle: 45,
                                        data: [
                                            { id: 0, value: presentStudent, label: 'Present' },
                                            { id: 1, value: totalStudent-presentStudent, label: 'Absent' },
                                        ],
                                    },
                                ]}
                                width={400}
                                height={200}
                            />
                        </Box>
                        <Box style={style.attendanceSheetTitle}>
                            <Typography variant="h6" component="h2" style={style.transitionModalDate}>
                                Attendance sheet
                            </Typography>
                            <Box style={style.attendanceSheet}>
                                <Paper style={{ height: 300, width: '100%' }}>
                                    <TableVirtuoso
                                        data={studentDetails}
                                        components={VirtuosoTableComponents}
                                        fixedHeaderContent={fixedHeaderContent}
                                        itemContent={rowContent}
                                    />
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default LectureInfoModal