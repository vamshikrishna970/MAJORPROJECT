import { createSlice, nanoid } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [{ id: "welcome", text: "Learn Redux Toolkit", done: false }],
  reducers: {
    addTodo: { reducer: (state, action) => { state.unshift(action.payload); }, prepare: (text) => ({ payload: { id: nanoid(), text, done: false } }) },
    deleteTodo: (state, action) => state.filter((todo) => todo.id !== action.payload),
    toggleTodo: (state, action) => { const todo = state.find((item) => item.id === action.payload); if (todo) todo.done = !todo.done; },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
