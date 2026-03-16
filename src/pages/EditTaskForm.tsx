import { Box, TextField, Button } from "@mui/material";


interface EditTaskFormProps {
    name: string;
    description: string;
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function EditTaskForm({ name, description, onSubmit, onChange }: EditTaskFormProps) {
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
            <TextField
                className="form-control"
                defaultValue={description}
                label="task description"
                name="description"
                placeholder="task description"
                onChange={onChange}
            />
        </div>
        <div className="form-group">
            <Button type="submit" variant="contained">Save Changes</Button>
        </div>
    </Box>
}

export default EditTaskForm;