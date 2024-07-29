import React from 'react';
import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import CheckBox from 'expo-checkbox';
import { styles } from './styles/styles';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    setEditTitle,
    setEditDescription,
    saveEdit,
    toggleComplete,
    setEditingIndex,
    startEditing,
    deleteTodo,
} from '@/app/todoSlice';
import { RootState } from '@/app/store';
import { Todo } from '@/app/todoSlice';

const TodoList: React.FC = () => {
    const dispatch = useDispatch();
    const { todos, filter, editTitle, editDescription, editingIndex } =
        useSelector((state: RootState) => state.todos);

    const getFilteredTodos = (): Todo[] => {
        if (filter === 'completed') {
            return todos.filter((todo) => todo.completed);
        }
        if (filter === 'uncompleted') {
            return todos.filter((todo) => !todo.completed);
        }
        return todos;
    };

    return (
        <FlatList
            data={getFilteredTodos()}
            renderItem={({ item, index }) => (
                <View style={styles.todo}>
                    {editingIndex !== index ? (
                        <CheckBox
                            style={styles.checkbox}
                            value={item.completed}
                            onValueChange={() =>
                                dispatch(toggleComplete(index))
                            }
                        />
                    ) : null}
                    {editingIndex === index ? (
                        <View style={styles.edit}>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={styles.input}
                                    value={editTitle}
                                    onChangeText={(text) =>
                                        dispatch(setEditTitle(text))
                                    }
                                />
                                <TextInput
                                    style={styles.input}
                                    value={editDescription}
                                    onChangeText={(text) =>
                                        dispatch(setEditDescription(text))
                                    }
                                />
                                <View style={styles.editActions}>
                                    <View style={styles.buttonContainer}>
                                        <Pressable
                                            style={styles.button}
                                            onPress={() =>
                                                dispatch(saveEdit(index))
                                            }
                                        >
                                            <Text style={styles.buttonText}>
                                                Save
                                            </Text>
                                        </Pressable>
                                    </View>
                                    <View style={styles.buttonDisabled}>
                                        <Pressable
                                            style={styles.button}
                                            onPress={() =>
                                                dispatch(setEditingIndex(null))
                                            }
                                        >
                                            <Text style={styles.buttonText}>
                                                Cancel
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text
                                style={
                                    item.completed
                                        ? styles.completed
                                        : styles.uncompleted
                                }
                            >
                                {item.title}
                            </Text>
                            <Text
                                style={
                                    item.completed
                                        ? styles.completed
                                        : styles.uncompleted
                                }
                            >
                                {item.description}
                            </Text>
                        </View>
                    )}
                    {editingIndex !== index ? (
                        <View style={styles.editActions}>
                            <Pressable
                                style={styles.button}
                                onPress={() => dispatch(startEditing(index))}
                            >
                                <AntDesign name="edit" size={22} color="gray" />
                            </Pressable>
                            <Pressable
                                style={styles.button}
                                onPress={() => dispatch(deleteTodo(index))}
                            >
                                <Feather name="delete" size={24} color="gray" />
                            </Pressable>
                        </View>
                    ) : null}
                </View>
            )}
            keyExtractor={(_item, index) => index.toString()}
        />
    );
};

export default TodoList;
