import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';

const style = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
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
  }
};

function LectureInfoModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const presentStudent = props.presentStudents;
  const totalStudent = props.totalStudents;
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style.modalBox}>
            <Box sx={style.lectureDetails}>
                <Typography variant="h5" component="h2" style={style.transitionModalTitle}>
                CS-4242 - Human Computer Interaction
                </Typography>
                <Typography variant="h6" component="h2" style={style.transitionModalDate}> 
                Date - 09/06/2023
                </Typography>
            </Box>
            <Box style={style.pieChartBox} >
                <PieChart
                    series={[
                        {
                        arcLabel: (item) => `${item.value}`,
                        arcLabelMinAngle: 45,
                        data: [
                            { id: 0, value: presentStudent.length, label: 'Present' },
                            { id: 1, value: totalStudent-presentStudent.length, label: 'Absent' },
                        ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default LectureInfoModal