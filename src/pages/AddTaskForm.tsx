import { TextField, Button, Box } from "@mui/material";

interface AddTaskFormProps{
    onSubmit : (e : React.SubmitEvent<HTMLFormElement>) => void;
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
    description: string;
}

function AddTaskForm(props: AddTaskFormProps){
    const {onSubmit, onChange, title, description} = props;


    
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
            <TextField
                id={description}
                label={description}
                required
                name="description"
                onChange={onChange}
                type="text"
                part={"Enter a "+ description}
                />
            <Button variant="outlined" color="primary" type="submit">Add Task</Button>
        </Box>
    )
    
}

export default AddTaskForm;