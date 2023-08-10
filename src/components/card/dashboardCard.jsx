import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {currentLectureDetails} from "../../services/DashboardServices";
import {useEffect} from "react";

export default function PricingCards() {

    const [data, setData] = React.useState([]);

    console.log("hello")

    useEffect(() => {

        console.log("hello")
        const getCurrentLectureDetails = async() => {
            const response = await currentLectureDetails();
            const temp = await response.data.data[0];
            setData(temp);
            console.log("hello")
            console.log("DATA", data);
        }
        getCurrentLectureDetails();
    }, []);

    useEffect(() => {
        if (data !== null) {
            console.log("Accessing data:", data);
            // You can perform actions with the data here
        }
    }, [data]);

    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: 2,
                p: 5,
                pb: 0
            }}
        >
            <Card size="md" variant="outlined">
                <Chip size="sm" variant="outlined" color="success">
                    ONGOING
                </Chip>
                <Typography level="h2" fontSize="xl2">
                    {data?.course?.moduleName} | {data?.course?.moduleCode}
                </Typography>
                {/*<Typography level="h4" fontSize="xl1">*/}
                {/*    CS 3032*/}
                {/*</Typography>*/}
                <Divider inset="none" />
                <CardActions>
                    <Button
                        variant="soft"
                        color="neutral"
                        endDecorator={<KeyboardArrowRight />}
                    >
                        Attendance
                    </Button>
                    <Typography level="h2" fontWeight="bold" sx={{ mr: 'auto' }} color="success">
                        {data?.attendance}{' '}
                        <Typography fontSize="sm" textColor="text.tertiary">
                            / {data?.expectedAttendance}
                        </Typography>
                    </Typography>
                </CardActions>
            </Card>
        </Box>
    );
}