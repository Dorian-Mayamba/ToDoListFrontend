import { Box, TextField, Select, Button, MenuItem, type SelectChangeEvent } from "@mui/material";
import {priorities, statuses} from '../constants'

interface EditTaskFormProps {
    name: string;
    priority: string;
    status : string;
    onSubmit : (e: React.SubmitEvent<HTMLFormElement>) => void;
    onChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange : (e : SelectChangeEvent<string>) => void;
}

function EditTaskForm({ name, status, priority, onSubmit, onChange, onSelectChange }: EditTaskFormProps) {
    return <Box component={"form"} onSubmit={onSubmit}>
        <div className="form-group">
            <TextField
                className="form-control"
                defaultValue={name}
                label="task name"
                name="name"
                placeholder="task name"
                onChange={onChange}
            />
        </div>
        <div className="form-group">
            <Select label="task priority" defaultValue={priority} className="form-control" name="priority"
                onChange={onSelectChange}
                >
            {priorities.map((priority, index) => <MenuItem value={priority}>{priority}</MenuItem>)}
            </Select>   
        </div>
        <div className="form-group">
            <Select label="task status" onChange={onSelectChange} defaultValue={status} className="form-control" name="status">
                {statuses.map((status, index) => <MenuItem value={status}>{status}</MenuItem>)}
            </Select>
        </div>
        <div className="form-group">
            <Button type="submit" variant="contained">Save Changes</Button>
        </div>
    </Box>
}

export default EditTaskForm;