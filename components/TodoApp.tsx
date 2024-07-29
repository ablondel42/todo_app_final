import React, { useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles/styles';
import TodoList from './TodoList';
import Form from './Form';
import Header from './Header';
import FilterChips from './FilterChips';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialTodos } from '../app/todoSlice';
import { RootState } from '@/app/store';
import { Todo } from '@/app/todoSlice';

const TodoApp: React.FC = () => {
    const dispatch = useDispatch();
    const { todos, formVisibility, initialLoadComplete } = useSelector(
        (state: RootState) => state.todos,
    );

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const data = await AsyncStorage.getItem('todos');
                if (data != null) {
                    const parsedTodos: Todo[] = JSON.parse(data);
                    dispatch(setInitialTodos(parsedTodos));
                } else {
                    dispatch(setInitialTodos([]));
                }
            } catch (e) {
                console.error(e);
            }
        };
        loadTodos();
    }, [dispatch]);

    useEffect(() => {
        if (initialLoadComplete) {
            const saveTodos = async () => {
                try {
                    const data = JSON.stringify(todos);
                    await AsyncStorage.setItem('todos', data);
                } catch (e) {
                    console.error(e);
                }
            };
            saveTodos();
        }
    }, [todos, initialLoadComplete]);

    return (
        <View style={styles.container}>
            <Header />
            {formVisibility && <Form />}
            <FilterChips />
            <TodoList />
        </View>
    );
};

export default TodoApp;
