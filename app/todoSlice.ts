import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define Todo item
export interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

// Define state
export interface TodosState {
    todos: Todo[];
    title: string;
    description: string;
    completed: boolean;
    editingIndex: number | null;
    editTitle: string;
    editDescription: string;
    filter: 'all' | 'completed' | 'uncompleted';
    formVisibility: boolean;
    initialLoadComplete: boolean;
}

// Define initial state
const initialState: TodosState = {
    todos: [],
    title: '',
    description: '',
    completed: false,
    editingIndex: null,
    editTitle: '',
    editDescription: '',
    filter: 'all',
    formVisibility: false,
    initialLoadComplete: false,
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setFilter: (
            state,
            action: PayloadAction<'all' | 'completed' | 'uncompleted'>,
        ) => {
            state.filter = action.payload;
        },
        setEditTitle: (state, action: PayloadAction<string>) => {
            state.editTitle = action.payload;
        },
        setEditDescription: (state, action: PayloadAction<string>) => {
            state.editDescription = action.payload;
        },
        setEditingIndex: (state, action: PayloadAction<number | null>) => {
            state.editingIndex = action.payload;
        },
        setFormVisibility: (state, action: PayloadAction<boolean>) => {
            state.formVisibility = action.payload;
        },
        toggleComplete: (state, action: PayloadAction<number>) => {
            const todo = state.todos[action.payload];
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
            state.title = '';
            state.description = '';
            state.completed = false;
            state.formVisibility = false;
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos.splice(action.payload, 1);
        },
        startEditing: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.editingIndex = index;
            const todo = state.todos[index];
            if (todo) {
                state.editTitle = todo.title;
                state.editDescription = todo.description;
            }
        },
        saveEdit: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            const todo = state.todos[index];
            if (todo) {
                todo.title = state.editTitle;
                todo.description = state.editDescription;
                state.editingIndex = null;
                state.editTitle = '';
                state.editDescription = '';
            }
        },
        setInitialTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
            state.initialLoadComplete = true;
        },
    },
});

export const {
    setTitle,
    setDescription,
    setFilter,
    setEditTitle,
    setEditDescription,
    setEditingIndex,
    setFormVisibility,
    toggleComplete,
    addTodo,
    deleteTodo,
    startEditing,
    saveEdit,
    setInitialTodos,
} = todosSlice.actions;

export default todosSlice.reducer;
