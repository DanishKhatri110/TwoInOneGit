//@ts-nocheck
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, ImageBackground } from 'react-native';
import { IconButton } from 'react-native-paper';
import WithOutTask from '../todoComponents/WithOutTask';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

type TodoItem = {
    id: string;
    title: string;
    completed: boolean;
};

const TodoList = () => {
    const [todoList, setTodoList] = useState<TodoItem[]>([]);
    const [editTodo, setEditTodo] = useState<TodoItem | null>(null);
    const [completionMessage, setCompletionMessage] = useState<string | null>(null);

    // Yup validation schema for title input
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, 'Task should be at least 3 characters')
            .required('Add Your Task'),
    });

    // Handle Add Todo List
    const handleAddTodo = (title: string) => {
        setTodoList([...todoList, { id: Date.now().toString(), title, completed: false }]);
    };

    // Handle Update Todo
    const handleUpdateTodo = (title: string) => {
        if (editTodo) {
            const updatedTodoList = todoList.map((item) =>
                item.id === editTodo.id ? { ...item, title } : item
            );
            setTodoList(updatedTodoList);
            setEditTodo(null);
        }
    };

    //Handle Delete Todo List
    const handleDeleteTodo = (id: string) => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedTodoList);

        if (editTodo && editTodo.id === id) {
            setEditTodo(null);
        }
    };

    // Handle Edit Todo
    const handleEditTodo = (todo: TodoItem) => {
        setEditTodo(todo);
    };

    // Complete Todo
    const handleToggleComplete = (id: string) => {
        const updatedTodoList = todoList.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        const completedTask = updatedTodoList.find((item) => item.id === id);
        if (completedTask) {
            setCompletionMessage(`Congrats, you completed ${completedTask.title} task`);
            setTimeout(() => setCompletionMessage(null), 3000); // Clear message after 3 seconds
        }
        setTodoList(updatedTodoList);
    };

    // Render Todo Item
    const renderTodo = ({ item }: { item: TodoItem }) => (
        <View style={styles.todoView}>
            <Text style={[styles.todoText, item.completed && styles.completedText]}>
                {item.title}
            </Text>
            <IconButton
                icon={item.completed ? 'undo' : 'check'}
                iconColor="white"
                size={30}
                onPress={() => handleToggleComplete(item.id)}
            />
            <IconButton
                icon="pencil"
                iconColor="white"
                size={30}
                onPress={() => handleEditTodo(item)}
            />
            <IconButton
                icon="trash-can"
                iconColor="white"
                size={30}
                onPress={() => handleDeleteTodo(item.id)}
            />
        </View>
    );

    return (
        <ImageBackground
            blurRadius={15}
            source={require('../todoAssets/backG.png')}
            resizeMode="cover"
            style={styles.BgImage}
        >
            <View style={styles.mainView}>
                <Formik
                    initialValues={{ title: editTodo ? editTodo.title : '' }}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        if (editTodo) {
                            handleUpdateTodo(values.title);
                        } else {
                            handleAddTodo(values.title);
                        }
                        resetForm();
                        Keyboard.dismiss();
                    }}
                >
                    {({ handleChange, handleSubmit, values, errors, touched }) => (
                        <>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Add Task"
                                value={values.title}
                                onChangeText={handleChange('title')}
                            />
                            {touched.title && errors.title && (
                                <Text style={styles.errorText}>{errors.title}</Text>
                            )}
                            <TouchableOpacity style={[
                                styles.touchBtn,
                                { backgroundColor: editTodo ? 'grey' : '#6d6969' },
                            ]}
                                onPress={handleSubmit}>
                                <Text style={styles.touchText}>{editTodo ? 'Edit&Save' : 'Add'}</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>

                {/* Render Todo List */}
                {todoList.filter((todo) => !todo.completed).length === 0 ? (
                    <>
                        <WithOutTask />
                        {completionMessage && (
                            <View style={styles.messageContainer}>
                                <Text style={styles.completionMessage}>{completionMessage}</Text>
                            </View>
                        )}
                    </>
                ) : (
                    <>
                        <FlatList
                            data={todoList.filter((todo) => !todo.completed)}
                            renderItem={renderTodo}
                            keyExtractor={(item) => item.id}
                            style={styles.flatList}
                        />
                        {completionMessage && (
                            <View style={styles.messageContainer}>
                                <Text style={styles.completionMessage}>{completionMessage}</Text>
                            </View>
                        )}
                    </>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    mainView: {
        // flex: 1,
        marginHorizontal: 20,
        paddingTop: 2,
        // backgroundColor:'white',
        height: hp('100%'),
        width: wp('90%'),
        // marginBottom:'15%',
    },
    BgImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height:'100%',
    },
    inputText: {
        backgroundColor: '#9c9797',
        marginTop: 10,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 16,
        fontSize: 20,
        color:'#eeecec',
    },
    touchBtn: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 30,
    },
    touchText: {
        color: '#eeeaea',
        fontWeight: 'bold',
        fontSize: 20,
    },
    todoView: {
        flex: 1,
        backgroundColor: '#b4a9a9',
        margin: 15,
        borderRadius: 10,
        padding:5.5,
        flexDirection: 'row',
        alignItems: 'center',
        // for iOS
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        // for android
        elevation: 4,
    },
    todoText: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 15,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginLeft: 10,
    },
    flatList: {
        flex: 1,
        marginBottom:55,
    },
     messageContainer: {
        position: 'absolute',
        top: '50%',
        left: '10%',
        right: '10%',
        backgroundColor: '#696161aa',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    completionMessage: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
    },
     completedText: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
});

export default TodoList;
