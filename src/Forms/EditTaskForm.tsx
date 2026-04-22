import { Box, TextField, Select, Button, MenuItem, type SelectChangeEvent, Paper, Typography } from "@mui/material";
import { priorities, statuses } from '../constants'
import { useNavigate } from "react-router-dom";

interface EditTaskFormProps {
    name: string;
    priority: string;
    status: string;
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange: (e: SelectChangeEvent<string>) => void;
}

function EditTaskForm({ name, status, priority, onSubmit, onChange, onSelectChange }: EditTaskFormProps) {
    const navigate = useNavigate();

    const redirect = (path: string) => {
        navigate(path);
    }

    let statusKeyVal = Object.entries(statuses).find(([key, value]) => status == value);

    return <>
        <Paper sx={{ width: '40vw', position: 'absolute', left: '50%', top: '50%', transform: 'translateX(-50%) translateY(-50%)' }}>
            <Box component={"form"} onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, p:5 }}>
            <Typography sx={{ textAlign: 'center', p:4 }} variant="h4">{`Edit ${name} task`}</Typography>
                <div className="form-group">
                    <TextField
                        className="form-control"
                        defaultValue={name}
                        label="task name"
                        name="name"
                        value={name}
                        fullWidth
                        placeholder="task name"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <Select fullWidth label="task priority" value={priority} defaultValue={priority} className="form-control" name="priority"
                        onChange={onSelectChange}
                    >
                        {priorities.map((priority, index) => <MenuItem value={priority}>{priority}</MenuItem>)}
                    </Select>
                </div>
                <div className="form-group">
                    <Select fullWidth label="task status" value={status} onChange={onSelectChange} defaultValue={statusKeyVal ? statusKeyVal[0] : ''} className="form-control" name="status">
                        {Object.entries(statuses).map(([key, value]) => <MenuItem value={key}>{value}</MenuItem>)}
                    </Select>
                </div>
                <div className="form-group">
                    <Button fullWidth type="submit" variant="contained">Save Changes</Button>
                </div>
                <div className="form-group">
                    <Button onClick={(e) => redirect('/')} fullWidth variant="contained" color="success">Back</Button>
                </div>
            </Box>
        </Paper>

    </>

}

export default EditTaskForm;