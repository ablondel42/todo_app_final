import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '@/app/todoSlice';
import { RootState } from '@/app/store';
import { Todo } from '@/app/todoSlice';

const FilterChips: React.FC = () => {
    const dispatch = useDispatch();
    const { todos, filter } = useSelector((state: RootState) => state.todos);

    return (
        <View style={styles.filterOptions}>
            <Pressable
                style={
                    filter === 'all'
                        ? styles.filterChipActive
                        : styles.filterChipInactive
                }
                onPress={() => dispatch(setFilter('all'))}
            >
                <Text>All: {todos.length}</Text>
            </Pressable>
            <Pressable
                style={
                    filter === 'uncompleted'
                        ? styles.filterChipActive
                        : styles.filterChipInactive
                }
                onPress={() => dispatch(setFilter('uncompleted'))}
            >
                <Text>
                    To do:{' '}
                    {todos.filter((todo: Todo) => !todo.completed).length}
                </Text>
            </Pressable>
            <Pressable
                style={
                    filter === 'completed'
                        ? styles.filterChipActive
                        : styles.filterChipInactive
                }
                onPress={() => dispatch(setFilter('completed'))}
            >
                <Text>
                    Done: {todos.filter((todo: Todo) => todo.completed).length}
                </Text>
            </Pressable>
        </View>
    );
};

export default FilterChips;
