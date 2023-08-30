import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  editingTaskId: null, 
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    // Yeh ek object hai jo naye task ki details represent karta hai,
    // Yeh Date.now() function se generate kiya gaya timestamp hai, jo task ka unique identifier hai
    addTask: (state, action) => {
      state.tasks.push({ id: Date.now(), description: action.payload });
    },
    // Yeh line tasks array mein se tasks ko filter karne ka kaam karti hai
    // task => task.id !== action.payload: Yeh ek arrow function hai jo tasks array ko filter karta hai. 
    // Har ek task object ka id property ko action.payload (jo action object ke payload mein aata hai)
    //  ke saath compare karta hai. Agar id match nahi hota, matlab task delete karne ka condition satisfy hota hai.
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    // const task = state.tasks.find(...): Yeh line se woh task nikala jata hai jiski description update karni hai.
    //  find function state.tasks array mein se task dhoondhne ka kaam karta hai jiska id action payload mein aaya hai.
    editTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        task.description = action.payload.newDescription;
      }
    },
    setEditingTaskId: (state, action) => {
      state.editingTaskId = action.payload;
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { addTask,  deleteTask, editTask, setEditingTaskId, clearTasks } = listSlice.actions;
export default listSlice.reducer;
