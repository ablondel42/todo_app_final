import React from 'react';
import { View, Text, TextInput, Keyboard, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles/styles';
import {
    addTodo,
    setTitle,
    setDescription,
    setFormVisibility,
    setFilter,
} from '@/app/todoSlice';
import { RootState } from '@/app/store';

const Form: React.FC = () => {
    const dispatch = useDispatch();
    const { title, description } = useSelector(
        (state: RootState) => state.todos,
    );

    const handleAddTodo = () => {
        if (title.trim() && description.trim()) {
            dispatch(addTodo({ title, description, completed: false }));
            dispatch(setFilter('all'));
            Keyboard.dismiss();
        }
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={(text) => dispatch(setTitle(text))}
            />
            <TextInput
                placeholder="Description"
                style={styles.input}
                value={description}
                onChangeText={(text) => dispatch(setDescription(text))}
            />
            <View style={styles.editActions}>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={handleAddTodo}>
                        <Text style={styles.buttonText}>Save</Text>
                    </Pressable>
                </View>
                <View style={styles.buttonDisabled}>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            dispatch(setFormVisibility(false));
                            dispatch(setTitle(''));
                            dispatch(setDescription(''));
                        }}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default Form;
