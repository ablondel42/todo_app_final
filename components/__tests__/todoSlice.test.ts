import todosReducer, {
    addTodo,
    deleteTodo,
    setDescription,
    setFilter,
    setFormVisibility,
    setInitialTodos,
    setTitle,
    startEditing,
    saveEdit,
    toggleComplete,
    TodosState,
} from '@/app/todoSlice';

describe('todos reducer', () => {
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

    it('initial state', () => {
        expect(todosReducer(undefined, { type: 'unknown' })).toEqual(
            initialState,
        );
    });

    it('setTitle', () => {
        const actual = todosReducer(initialState, setTitle('Test Title'));
        expect(actual.title).toEqual('Test Title');
    });

    it('setDescription', () => {
        const actual = todosReducer(
            initialState,
            setDescription('Test Description'),
        );
        expect(actual.description).toEqual('Test Description');
    });

    it('addTodo', () => {
        const todo = {
            title: 'Test Todo',
            description: 'Test Description',
            completed: false,
        };
        const actual = todosReducer(initialState, addTodo(todo));
        expect(actual.todos.length).toEqual(1);
        expect(actual.todos[0]).toEqual(todo);
    });

    it('deleteTodo', () => {
        const todo = {
            title: 'Test Todo',
            description: 'Test Description',
            completed: false,
        };
        const state = { ...initialState, todos: [todo] };
        const actual = todosReducer(state, deleteTodo(0));
        expect(actual.todos.length).toEqual(0);
    });

    it('setFilter', () => {
        const actual = todosReducer(initialState, setFilter('completed'));
        expect(actual.filter).toEqual('completed');
    });

    it('setFormVisibility', () => {
        const actual = todosReducer(initialState, setFormVisibility(true));
        expect(actual.formVisibility).toEqual(true);
    });

    it('toggleComplete', () => {
        const todo = {
            title: 'Test Todo',
            description: 'Test Description',
            completed: false,
        };
        const state = { ...initialState, todos: [todo] };
        const actual = todosReducer(state, toggleComplete(0));
        expect(actual.todos[0].completed).toEqual(true);
    });

    it('setInitialTodos', () => {
        const todos = [
            { title: 'Todo 1', description: 'Description 1', completed: false },
            { title: 'Todo 2', description: 'Description 2', completed: true },
        ];
        const actual = todosReducer(initialState, setInitialTodos(todos));
        expect(actual.todos.length).toEqual(2);
        expect(actual.todos).toEqual(todos);
        expect(actual.initialLoadComplete).toEqual(true);
    });

    it('startEditing', () => {
        const todo = {
            title: 'Test Todo',
            description: 'Test Description',
            completed: false,
        };
        const state = { ...initialState, todos: [todo] };
        const actual = todosReducer(state, startEditing(0));
        expect(actual.editingIndex).toEqual(0);
        expect(actual.editTitle).toEqual(todo.title);
        expect(actual.editDescription).toEqual(todo.description);
    });

    it('saveEdit', () => {
        const todo = {
            title: 'Test Todo',
            description: 'Test Description',
            completed: false,
        };
        const state = {
            ...initialState,
            todos: [todo],
            editingIndex: 0,
            editTitle: 'Updated Title',
            editDescription: 'Updated Description',
        };
        const actual = todosReducer(state, saveEdit(0));
        expect(actual.todos[0].title).toEqual('Updated Title');
        expect(actual.todos[0].description).toEqual('Updated Description');
        expect(actual.editingIndex).toEqual(null);
        expect(actual.editTitle).toEqual('');
        expect(actual.editDescription).toEqual('');
    });
});
