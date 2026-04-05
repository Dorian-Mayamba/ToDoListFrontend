import { TextField, Button, Box, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import {statuses, priorities} from '../constants';

interface AddTaskFormProps{
    onSubmit : (e : React.SubmitEvent<HTMLFormElement>) => void;
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange : (e : SelectChangeEvent) => void;
    title: string;
}

function AddTaskForm(props: AddTaskFormProps){
    const {onSubmit, onChange, title, onSelectChange} = props;


    
    return (
        <Box onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap:3 }} component={"form"}>
            <TextField
                id={title}
                label={title}
                required
                name="name"
                type="text"
                onChange={onChange}
                placeholder={"Enter a "+title}
                />
            
            <Select name="priority" onChange={onSelectChange}>
                {priorities.map((priority) => <MenuItem value={priority}>{priority}</MenuItem>)}
            </Select>

            <Select name="status" onChange={onSelectChange}>
                {Object.entries(statuses).map(([key, value]) => <MenuItem value={key}>{value}</MenuItem>)}
            </Select>
            
            <Button variant="outlined" color="primary" type="submit">Add Task</Button>
        </Box>
    )
    
}

export default AddTaskForm;