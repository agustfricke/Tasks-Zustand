import { useStore } from "./store"
import { useState } from "react"

function App() {

  const [todoText, setTodoText] = useState("");
  const { addTask,  tasks} = useStore();

  return (
    <>

      <input type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} />
      <button onClick={() => {
        if (todoText.length) {
          addTask(todoText);
          setTodoText("");
        }
      }}>Add Task</button>

        <div>
        {tasks.map((task) => (
          <li key={task.id}>
            <Tasks task={task} />
          </li>
        ))}
        </div>

        </>
  )
}
export default App

interface TasksProps {
  task: {
    id: string;
    body: string;
    completed: boolean;
  }  
}

const Tasks = ({ task }: TasksProps) => {

  const [edit, setEdited] = useState(false);
  const { removeTask, toggleTask, editTask } = useStore();

  let content;

  if(edit) {
    content = (
                <>
              <input type="text" value={task.body} onChange={(e) => editTask( task.id, e.target.value )} />

              <button onClick={() => setEdited(false)}>
                Save
                </button>
                </>
    )
  } else {
    content = (
      <>
      <span>
              {task.body}
          </span>  
              <button onClick={() => setEdited(true)}>Edit</button>
              </>
      
    )
  }

  return (
    <>
          <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
      {content}
              <button onClick={() => removeTask(task.id)}>Remove</button>


    </>
  )
}
