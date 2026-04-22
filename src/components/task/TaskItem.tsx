import { Paper, Typography, ListItem, Stack, Chip, IconButton, Box } from "@mui/material";
import { Edit, DeleteForever } from "@mui/icons-material";
import type { TaskItemProps } from "../../types";
import useDialog from "../../hooks/useDialog";
import { useContext } from "react";
import { activeTaskContext } from "../../contexts/ActiveTaskProvider";
import { useNavigate } from "react-router-dom";

const priorityColor: Record<string, 'error' | 'warning' | 'default'> = {
    High: 'error',
    Medium: 'warning',
    Normal: 'default',
};

const statusColor: Record<string, 'default' | 'info' | 'success'> = {
    'Not Started': 'default',
    'In Progress': 'info',
    'Completed': 'success',
};

function TaskItem(task: TaskItemProps) {
    const { name, status, priority } = task;

    const { UpdateDialogMode } = useDialog();
    const { updateActiveTask } = useContext(activeTaskContext);
    const navigate = useNavigate();

    const handleDelete = () => {
        updateActiveTask(task);
        UpdateDialogMode('DELETE');
    };

    return (
        <ListItem disablePadding sx={{ mb: 1 }}>
            <Paper
                variant="outlined"
                sx={{
                    width: '100%',
                    px: 2,
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    borderRadius: 2,
                    '&:hover': { boxShadow: 2 },
                    transition: 'box-shadow 0.2s',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, minWidth: 0 }}>
                    <Typography variant="subtitle1" fontWeight={600} noWrap>
                        {name}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            label={status}
                            size="small"
                            color={statusColor[status] ?? 'default'}
                            variant="filled"
                        />
                        <Chip
                            label={priority}
                            size="small"
                            color={priorityColor[priority] ?? 'default'}
                            variant="outlined"
                        />
                    </Stack>
                </Box>

                <Stack direction="row" spacing={0.5} flexShrink={0}>
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/tasks/${task.id}/edit`)}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={handleDelete}>
                        <DeleteForever fontSize="small" />
                    </IconButton>
                </Stack>
            </Paper>
        </ListItem>
    );
}

export default TaskItem;
