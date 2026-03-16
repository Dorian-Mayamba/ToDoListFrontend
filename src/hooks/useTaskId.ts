import { useContext } from "react"
import { taskIdContext } from "../contexts/TaskIdProvider"


const useTaskId = () => {
    var context = useContext(taskIdContext);
    if (!context) throw new Error('Unable to load taskIdContext');
    return context;
}

export default useTaskId;