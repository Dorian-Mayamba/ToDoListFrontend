import { Box, Container, Grid, Paper, Typography, Button, styled, Stack, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, ButtonGroup } from "@mui/material";
import { AddTask, Assignment, Dashboard, Settings, Task, TaskAlt, Logout, Done, DoneAll } from '@mui/icons-material';
import { PieChart, useDrawingArea } from "@mui/x-charts";
import { useContext, useEffect, useState } from "react";
import type { DialogModeProps, TaskItemProps, UserDetail } from "../types";
import TaskList from "../components/task/TaskLists";
import useDialog from "../hooks/useDialog";
import DeleteDialog from "./DeleteDialog";
import { activeTaskContext } from "../contexts/ActiveTaskProvider";
import { statuses, taskEndpoint } from '../constants'
import { useNavigate } from "react-router-dom";
import FetchHelper from "../helpers/fetchHelper";
import useFetch from "../hooks/useFetch";
import CompletedTaskList from "../components/task/CompletedTaskList";

function Home() {

    const [tasks, setTasks] = useState<TaskItemProps[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);

    const { mode, UpdateDialogMode } = useDialog();
    const { activeTask } = useContext(activeTaskContext);
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('A jwtToken has to be set');
    }
    const { data: tasksResponse, loading: isLoading, error } = useFetch<TaskItemProps[]>(import.meta.env.VITE_SERVER_URL + taskEndpoint,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    const user: UserDetail = JSON.parse(localStorage.getItem('user') as string);


    const navigate = useNavigate();

    useEffect(() => {
        console.log('effect run');
        if (!(isLoading && error) && tasksResponse) {
            console.log('loading tasks')
            setTasks(tasksResponse);
        }

        if (error) {
            console.log(error);
        }

    }, [tasksResponse]);

    const HandleDelete = async () => {
        let path = import.meta.env.VITE_SERVER_URL as string + taskEndpoint + '/' + activeTask.id + '/';
        try {
            setLoading(true);
            await FetchHelper(path, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        } catch (err) {

        } finally {
            setLoading(false);
        }
        if (!loading) {
            var filtered = tasks.filter(task => task.id != activeTask.id);
            setTasks(filtered);
            CloseDialog();
        }
    }

    const OpenDialog = (dialogMode: DialogModeProps) => {
        UpdateDialogMode(dialogMode);
    }

    function CloseDialog() {
        UpdateDialogMode(null);
    }

    function AddTaskFunc() {
        navigate('/tasks/add', { replace: true });
    }

    return <>

        {mode == 'DELETE' &&
            <DeleteDialog
                open={mode != null}
                onClose={CloseDialog}
            >
                <ButtonGroup>
                    <Button onClick={CloseDialog} variant="outlined" color="primary">Cancel</Button>
                    <Button onClick={HandleDelete} variant="contained" color="primary">Delete</Button>
                </ButtonGroup>
            </DeleteDialog>
        }


        <Box sx={{ display: 'flex', flexGrow: 1 }}>

            <Container sx={{ border: "solid 1px", p: 2 }} component='div'>
                <h1>Welcome back {user?.first_name}</h1>

                <Grid container spacing={6}>
                    <Grid size={6}>
                        <Paper>
                            <Typography component='strong'><Task></Task>ToDo</Typography>
                            <Button href="/tasks/add" sx={{ float: 'right' }} variant="text"><AddTask /> Add task</Button>
                            <List>
                                {NonCompletedTasks(tasks).length > 0 ?
                                    <TaskList tasks={NonCompletedTasks(tasks)} />
                                    : <h1>No task to display</h1>}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid size={6}>
                        <Paper sx={{ marginBottom: '2rem' }}>
                            <Column>
                                <Typography component="strong" color="primary"><TaskAlt />Task Status</Typography>
                                <Stack direction={"row"}>
                                    <Stack>
                                        <StatusIndicator value={65} completionColor={'green'} color={'rgb(160,160,160)'} />
                                        <Typography align="center" component={"strong"}>Completed</Typography>
                                    </Stack>
                                    <Stack>
                                        <StatusIndicator value={45} completionColor={'blue'} color={'rgb(160,160,160)'} />
                                        <Typography align="center" component={"strong"}>In Progress</Typography>
                                    </Stack>
                                    <Stack>
                                        <StatusIndicator value={45} completionColor={'red'} color={'rgb(160,160,160)'} />
                                        <Typography align="center" component={"strong"}>Not Started</Typography>
                                    </Stack>
                                </Stack>
                            </Column>
                        </Paper>
                        <Paper>
                            <Typography component={"strong"} color="primary"><DoneAll />Completed Tasks</Typography>
                            <List>
                                {TaskCompleted(tasks).length > 0 ?
                                    <CompletedTaskList tasks={TaskCompleted(tasks)} /> :
                                    <h1>No Completed Task</h1>
                                }
                            </List>
                        </Paper>
                    </Grid>

                </Grid>

            </Container>
        </Box>

    </>
}

export default Home;


const Column = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 3
}))

const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
    fontWeight: 'bold',
}));


function PieCenterLabel({ children }: any) {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    )
}

function StatusIndicator({ value, color, completionColor }: any) {
    return (
        <PieChart
            series={[
                {
                    data: [
                        { value: 100 - value, color: color },
                        { value: value, color: completionColor }
                    ],
                    innerRadius: 35,
                    outerRadius: 45,
                    paddingAngle: 0,
                    cornerRadius: 0,
                    startAngle: 0,
                    endAngle: 360,
                },
            ]}
            width={120}
            height={120}
            hideLegend={true}
        >
            <PieCenterLabel>{`${value}%`}</PieCenterLabel>
        </PieChart>
    )
}

function TaskCompleted(tasks: TaskItemProps[]) {
    return tasks.length > 0 ?
        tasks.filter(t => t.status == statuses.Completed) : [];
}

function NonCompletedTasks(tasks : TaskItemProps []) {
    return tasks.length > 0 ?
        tasks.filter(t => t.status !== statuses.Completed) : [];
}


