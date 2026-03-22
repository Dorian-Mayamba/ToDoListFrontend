import { Paper, Typography, ListItem, ListItemButton, Button, Stack, Grid, Box } from "@mui/material";
import { Edit, DeleteForever } from "@mui/icons-material";
import type { TaskItemProps } from "../../types";
import useDialog from "../../hooks/useDialog";
import { useContext } from "react";
import { taskContext } from "../../contexts/TaskFormProvider";

function TaskItem(task: TaskItemProps) {

    const {name, status, priority } = task;
    
    const { UpdateDialogMode } = useDialog();

    const {setTask} = useContext(taskContext);

    const HandleEdit = () => {
        setTask(task);

        UpdateDialogMode('EDIT');

    }

    const HandleDelete = () => {

        setTask(task)

        UpdateDialogMode('DELETE');
    }

    return <ListItem>
        <ListItemButton>
            <Paper>
                <Stack spacing={-3.5} justifyContent={"right"} direction={"row"}>
                    <Button onClick={HandleEdit}><Edit /></Button>
                    <Button onClick={HandleDelete}><DeleteForever /></Button>
                </Stack>
                <Grid container padding={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }} component={"div"}>
                        <Typography variant="h5">{name}</Typography>
                        <Stack gap={6} direction={"row"}>
                            <Typography component={"strong"}>{status}</Typography>
                            <Typography component={"strong"}>{priority}</Typography>
                        </Stack>
                    </Box>
                </Grid>
            </Paper>
        </ListItemButton>
    </ListItem>
}

export default TaskItem;