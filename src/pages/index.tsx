import { Box, Container, Grid, Paper, Typography, Button, styled, Stack, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, Link, ButtonGroup, type SelectChangeEvent } from "@mui/material";
import { AddTask, Assignment, Dashboard, Settings, Task, TaskAlt, Logout } from '@mui/icons-material';
import { PieChart, useDrawingArea } from "@mui/x-charts";
import { useContext, useEffect, useState } from "react";
import ToDoDialog from "./ToDoDialog";
import AddTaskForm from "../Forms/AddTaskForm";
import type { DialogModeProps, TaskItemProps, TaskResponse, UserDetail } from "../types";
import TaskList from "../components/task/TaskLists";
import useDialog from "../hooks/useDialog";
import EditTaskForm from "../Forms/EditTaskForm";
import DeleteDialog from "./DeleteDialog";
import { taskContext } from "../contexts/TaskFormProvider";
import { activeTaskContext } from "../contexts/ActiveTaskProvider";
import { taskEndpoint } from '../constants'
import { useNavigate } from "react-router-dom";
import FetchHelper from "../helpers/fetchHelper";
import useFetch from "../hooks/useFetch";

const drawerWidth = 240;
const sideBarWidth = 220;

const drawerItems = [
    {
        name: "Dashboard",
        component: <Dashboard />
    },

    {
        name: "My Tasks",
        component: <Assignment />
    },

    {
        name: "Settings",
        component: <Settings />
    }
]

function Home() {

    const [tasks, setTasks] = useState<TaskItemProps[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    
    const { mode, UpdateDialogMode } = useDialog();
    const { task: formData, updateTask, resetTask } = useContext(taskContext);
    const [taskResponse, setTaskResponse] = useState<TaskResponse>();
    const { activeTask } = useContext(activeTaskContext);
    const token = localStorage.getItem('token');
    if (!token){
        throw new Error('A jwtToken has to be set');
    }
    const {data : tasksResponse, loading : isLoading, error} = useFetch<TaskItemProps[]>(import.meta.env.VITE_SERVER_URL + taskEndpoint, 
        {
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        }
    );
    
    const user : UserDetail = JSON.parse(localStorage.getItem('user') as string);


    const navigate = useNavigate();

    useEffect(() => {
        if (!(isLoading && error) && tasksResponse){
            setTasks(tasksResponse);
        }

        if (!(isLoading) && taskResponse) {

        }

        if (error){
            console.log(error);
        }

    }, [tasksResponse, taskResponse])

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        if (mode == "ADD") {
            try {
                setLoading(true);
                const { data: task } = await FetchHelper<TaskResponse>(import.meta.env.VITE_SERVER_URL + taskEndpoint + '/',
                    {
                        body: JSON.stringify(
                            {
                                'name': formData.name,
                                'priority': formData.priority,
                                'status': formData.status
                            }
                        ),
                        headers : {
                            'Authorization' : `Bearer ${token}`,
                            'Content-Type' : 'application/json'
                        },
                        method : 'POST'
                    }
                )
                setTaskResponse(task);
            } catch (err){
                console.log(err);
            } finally {
                setLoading(false);
            }
            

            if (!loading && taskResponse) {
                setTasks((prev) => [...prev, { ...taskResponse }]);
            }
        } else if (mode == "EDIT") {
            let path = import.meta.env.VITE_SERVER_URL as string + taskEndpoint + '/' + activeTask.id + '/';
            try{
                const { data: task } = await FetchHelper<TaskResponse>(path,
                    {
                        method: 'PUT',
                        body: JSON.stringify({
                            'name': formData.name,
                            'priority': formData.priority,
                            'status': formData.status
                        }),
                        headers : {
                            'Authorization' : `Bearer ${token}`,
                            'Content-Type' : 'application/json'
                        }
                    }
                );
                setTaskResponse(task);
            } catch (err){
                console.log(err);
            } finally {
                setLoading(false);
            }
            

            let tempTasks = [...tasks];
            let idx = tempTasks.findIndex(t => t.id == activeTask.id);
            if (!(loading) && taskResponse) {
                tempTasks.splice(idx, 1, taskResponse);
                setTasks(tempTasks);
            }

        }
        resetTask();
        CloseDialog();
    }

    const HandleDelete = async () => {
        let path = import.meta.env.VITE_SERVER_URL as string + taskEndpoint + '/' + activeTask.id + '/';
        try {
            setLoading(true);
            await FetchHelper(path, { method: 'DELETE', headers: {'Authorization' : `Bearer ${token}`} });
        } catch(err) {

        } finally {
            setLoading(false);
        }
        if (!loading) {
            var filtered = tasks.filter(task => task.id != activeTask.id);
            setTasks(filtered);
            CloseDialog();
        }
    }

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTask(e);
    }

    const HandleSelectChange = (e: SelectChangeEvent) => {
        updateTask(e);
    }

    const OpenDialog = (dialogMode: DialogModeProps) => {
        UpdateDialogMode(dialogMode);
    }

    function CloseDialog() {
        UpdateDialogMode(null);
    }

    function OnLogout(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login', {replace : true});
    }

    return <>

        <ToDoDialog onClose={CloseDialog} open={mode != null}>

            {mode == 'ADD' && <AddTaskForm
                title="Task Name"
                onSubmit={handleSubmit}
                onChange={HandleChange}
                onSelectChange={HandleSelectChange}
            />}

            {mode == 'EDIT' && <EditTaskForm
                name={formData.name}
                priority={formData.priority}
                status={formData.status}
                onSubmit={handleSubmit}
                onChange={HandleChange}
                onSelectChange={HandleSelectChange}
            />}

        </ToDoDialog>

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
            <Drawer
                slotProps={{
                    paper: {
                        sx: {
                            bgcolor: 'blue',
                            color: '#fff',
                            width: sideBarWidth,
                            borderRight: '1px solid rgba(255, 255, 255, 0.12)',

                        }
                    }
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '&.MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },

                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Taskly
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {drawerItems.map((data, index) => (
                        <ListItem key={index}>
                            <ListItemButton>
                                <StyledIcon>
                                    {data.component}
                                </StyledIcon>
                                <ListItemText>{data.name}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ position: 'absolute', bottom: 30, left: '30%', transform: 'translateX(-50%)' }} component={"div"}>
                    <Button onClick={OnLogout} sx={{ display: 'flex', gap: 2, color: '#fff' }}>
                        <Logout /> Logout
                    </Button>
                </Box>

            </Drawer>

            <Container sx={{ border: "solid 1px", p: 2 }} component='div'>
                <h1>Welcome back {user?.first_name}</h1>

                <Grid container spacing={6}>
                    <Grid size={6}>
                        <Paper>
                            <Typography component='strong'><Task></Task>ToDo</Typography>
                            <Button onClick={(e) => { e.preventDefault(); OpenDialog('ADD') }} sx={{ float: 'right' }} variant="text"><AddTask /> Add task</Button>
                            <List>
                                {tasks.length > 0 ?
                                    <TaskList tasks={tasks} />
                                    : <h1>No task to display</h1>}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid size={6}>
                        <Paper>
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

const StyledIcon = styled(ListItemIcon)(({ theme }) => ({
    color: '#fff'
}))

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


