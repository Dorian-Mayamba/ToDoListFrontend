import { TextField, Button, Box, Select, MenuItem, type SelectChangeEvent, Typography, Paper, FormLabel } from "@mui/material";
import { statuses, priorities } from '../constants';
import { useNavigate } from "react-router-dom";

interface AddTaskFormProps {
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange: (e: SelectChangeEvent) => void;
    title: string;
}

function AddTaskForm(props: AddTaskFormProps) {
    const { onSubmit, onChange, title, onSelectChange } = props;

    const navigate = useNavigate();

    return (
        <>
            <Paper sx={{ width: '40vw', position: 'absolute', left: '50%', top: '50%', transform: 'translateX(-50%) translateY(-50%)' }}>
                <Typography sx={{ textAlign: 'center', p:4 }} variant="h4">{title}</Typography>
                <Box onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, p: 3, borderRadius: '2px' }} component={"form"}>
                    <FormLabel htmlFor={title}>name</FormLabel>
                    <TextField
                        id={title}
                        label={title}
                        required
                        name="name"
                        type="text"
                        fullWidth
                        onChange={onChange}
                        placeholder={"Enter a Task"}
                    />

                    <FormLabel htmlFor="priority">Priority</FormLabel>
                    <Select label="Priority" id="priority" required fullWidth name="priority" onChange={onSelectChange}>
                        {priorities.map((priority) => <MenuItem value={priority}>{priority}</MenuItem>)}
                    </Select>

                    <FormLabel htmlFor="status">Status</FormLabel>
                    <Select label="status" id="status" required fullWidth name="status" onChange={onSelectChange}>
                        {Object.entries(statuses).map(([key, value]) => <MenuItem value={key}>{value}</MenuItem>)}
                    </Select>

                    <Button fullWidth variant="contained" color="primary" type="submit">Add Task</Button>
                    <Button onClick={(e) => navigate('/')} fullWidth variant="contained" color="secondary">Back</Button>
                </Box>
            </Paper>

        </>


    )

}

export default AddTaskForm;