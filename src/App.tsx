import { useStore } from "./store"
import { useState } from "react"

function App() {

  const [todoText, setTodoText] = useState("");
  const { addTask, removeTask, toggleTask, tasks} = useStore();

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
        {tasks.map((todo) => (
          <div key={todo.id}>
          <input type="checkbox" checked={todo.completed} onChange={() => toggleTask(todo.id)} />
              {todo.body}
              <button onClick={() => removeTask(todo.id)}>Remove</button>
              </div>
        ))}
        </div>
        </>
  )
}

export default App
