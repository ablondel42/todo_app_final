import React from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles/styles';
import { setFormVisibility } from '@/app/todoSlice';
import { RootState } from '@/app/store';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const formVisibility = useSelector(
        (state: RootState) => state.todos.formVisibility,
    );

    return (
        <View style={styles.header}>
            <View style={styles.title}>
                <Image
                    source={require('../assets/images/list-logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.headerText}>TodoApp</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.button}
                    onPress={() => dispatch(setFormVisibility(!formVisibility))}
                >
                    <Text style={styles.buttonText}>New</Text>
                    <Ionicons name="create-outline" size={24} color="#eff" />
                </Pressable>
            </View>
        </View>
    );
};

export default Header;
