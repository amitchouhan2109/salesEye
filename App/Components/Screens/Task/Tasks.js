import React, { Component, useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    TextInput,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    ActivityIndicator,
    FlatList,
    Linking,
    StyleSheet, Alert
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Input, Item } from 'native-base';
import { globals, helpers, validators, API, } from '../../../Config';
// import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _B, _Layout, _ListView, _ContentType, _InlineLoader } from '../../../../../custom';
// import { mainLayoutHoc } from '../../../../../hoc';
import { mainStyle, images, sty, colors } from '../../../Theme';
import FastImage from 'react-native-fast-image'
import _InputText from '../../Custom/InputText/_InputText'
import styles from "./Styles";
import moment from 'moment';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../Config/Libs/globals';
import MainHoc from '../../Hoc/MainHoc';
import _Button from '../../Custom/Button/_Button';
import _Header from '../../Custom/Header/_Header';
import AsyncStorage from '@react-native-community/async-storage';
import InfoCart from '../ContentType/InfoCart/InfoCart';
import { setTasks } from "../../../Redux/Actions/TaskAction"
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { large } from '../../../Theme/FontSizes';
import Loader from '../../Custom/Loader/Loader'

const Tasks = (props) => {
    // const campaigns = useSelector(state => state.campaigns);
    const localize = useSelector(state => state.localize);
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks);
    const [task, settask] = useState([]);
    const [arrayholder, setarrayHolder] = useState([]);
    const [loading, setloading] = useState(false)
    const [search, setsearch] = useState(false)

    const signoutHandler = () => {
        signout()
    }

    const signout = async () => {
        // props.navigation.navigate('LogIn')
        let token = await AsyncStorage.getItem('token');
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    setloading(false)
                    AsyncStorage.removeItem('userAuthDetails');
                    AsyncStorage.removeItem('token');
                    AsyncStorage.removeItem('userName');

                    props.navigation.navigate('LogIn')

                },
                error: (err) => {
                    setloading(false)
                    setTimeout(() => {
                        Alert.alert("Error", err.message)
                    }, 200);
                },
                complete: () => {
                    setloading(false)
                },
            };
            setloading(true)
            let header = helpers.buildHeader();
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "portal_user": userAuthdetails.portal_user,
                "api_key": globals.API_KEY
            };
            API.signOut(data, cb, header);
        } else {
            props.navigation.navigate('LogIn')
        }

    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getTasks();
        });
        return unsubscribe;
    }, [props.navigation])


    const getTasks = async () => {
        let cb = {
            success: async (res) => {
                dispatch(setTasks({ res }))
                setloading(false)
                settask(res[0].tasks)
                setarrayHolder(res[0].tasks)
            },
            error: (err) => { },
            complete: () => { },
        };

        let header = helpers.buildHeader({});
        let userAuthdetails = await helpers.userAuthdetails();
        let data = {
            "user_id": userAuthdetails.user_id,
            "token": userAuthdetails.token,
            "portal_user": userAuthdetails.portal_user,
            "api_key": globals.API_KEY
        };
        API.getAllTasks(data, cb, header);
    }

    const signinHandler = () => {
    }

    const taskRender = (a) => {
        return (
            <View style={{ borderBottomWidth: 1.5, borderColor: colors.border }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Task', { task: a })}>
                    <InfoCart localize={localize} tasks={a} />
                </TouchableOpacity>
            </View >
        )
    }
    const searchFilterFunction = text => {
        const newData = arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.object ? item.object.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;

        });
        if (newData.length == 0) {
            Alert.alert('search not found')
            // this.setState({ msg: ' serach result not found' })
        }
        else {
            settask(newData)
            // this.setState({ myOder: newData });
        }
    }


    const _keyExtractor = (item, index) => "tasks" + index.toString();
    return (
        <>
            {
                // loading ? <Loader name />
                // :
                <View style={[mainStyle.rootView, styles.container]}>
                    <Loader
                        loading={loading} />
                    <_Header header={helpers.getLocale(localize, "tasks", "tasks")}
                        rightIcon={images.menu} rightcb
                        onPress={() => props.navigation.navigate('ChangePassord')}
                        onPress_signout={() => signoutHandler()}
                    />


                    <View style={{ borderWidth: 0 }}>
                        <_InputText
                            style={styles.TextInput}
                            placeholder={helpers.getLocale(localize, "tasks", "search")}
                            onChangeText={value => {
                                // setsearch(value)
                                searchFilterFunction(value)
                            }
                            }
                        />
                    </View>
                    <View style={{ paddingTop: 2, height: '60%' }}>
                        {task.length === 0 &&
                            <Text style={{ textAlign: 'center', paddingVertical: 30, fontSize: 20 }}>  Tasks List is Empty</Text>}
                        <FlatList
                            data={task}
                            renderItem={taskRender}
                            keyExtractor={_keyExtractor}
                            removeClippedSubviews={Platform.OS == "android" ? true : false}
                        />

                    </View>
                    <View style={[styles.signUpWrapper, { borderWidth: 0 }]}>
                        <View style={styles.signUpView}>
                            <_Button
                                btnTxt={helpers.getLocale(localize, "tasks", "add_task")}
                                callback={() => props.navigation.navigate('NewTask')} />
                        </View>
                    </View>
                </View >}
        </>

    );
};

export default MainHoc(Tasks)

