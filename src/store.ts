import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';
import { Task } from './types';


interface TaskState {
  tasks: Task[];
  addTask: (body: string) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, body: string) => void;
  toggleTask: (id: string) => void;
}

export const useStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (body: string) => {
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: uuidv4(),
          body,
          completed: false,
        } as Task,
      ],
    }));
  },
  removeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  editTask: (id, body: string) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? ({ ...task, body: body } as Task)
          : task
      ),
    }))
  },
  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? ({ ...task, completed: !task.completed } as Task)
          : task
      ),
    }));
  },
}));
