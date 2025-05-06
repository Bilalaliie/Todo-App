import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useForm } from "react-hook-form";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type FormInput = {
  task: string;
};

const App: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const onSubmit = (data: FormInput) => {
    if (data.task.trim()) {
      const newTodo = {
        id: Date.now(),
        text: data.task,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      reset();
    }
  };

  const toggleComplete = (id: number) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  const deleteTodo = (id: number) => {
    const updated = todos.filter((todo) => todo.id !== id);
    setTodos(updated);
  };

  const startEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    if (editText.trim() === "") return;
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editText } : todo
    );
    setTodos(updated);
    setEditId(null);
    setEditText("");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        My ToDo List
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", gap: 10, marginBottom: 20 }}
      >
        <TextField
          label="Add Task"
          fullWidth
          {...register("task", { required: true })}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>

      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {editId === todo.id ? (
              <TextField
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                size="small"
                sx={{ flexGrow: 1, marginRight: 1 }}
              />
            ) : (
              <Typography
                sx={{
                  textDecoration: todo.completed ? "line-through red" : "none",
                  color: todo.completed ? "black" : "white",
                  flexGrow: 1,
                }}
              >
                {todo.text}
              </Typography>
            )}
            {editId === todo.id ? (
              <IconButton onClick={() => saveEdit(todo.id)}>
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => startEdit(todo.id, todo.text)}>
                <EditIcon />
              </IconButton>
            )}
            <IconButton onClick={() => deleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
