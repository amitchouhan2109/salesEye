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

const Tasks = (props) => {
    // const campaigns = useSelector(state => state.campaigns);
    const localize = useSelector(state => state.localize);
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    const signoutHandler = () => {
        console.log("hi")
        signout()

    }

    const signout = async () => {
        let token = await AsyncStorage.getItem('token');
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        console.log("token", token, { userAuthdetails })
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    AsyncStorage.removeItem('userAuthDetails');
                    // props.navigation.navigate('LogIn')
                    setTimeout(() => {
                        Alert.alert(
                            'Success',
                            'Logout  successfully',
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        props.navigation.navigate('LogIn')
                                    }
                                },
                            ]
                        );
                    }, 200);
                },
                error: (err) => {
                    Alert.alert(err)
                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            console.log('header', header)
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "portal_user": userAuthdetails.portal_user,
                "api_key": globals.API_KEY
            };
            API.signOut(data, cb, header);

        } else {
            // getEndPoint()
        }

    }



    useEffect(() => {
        console.log("useEffect Tasks")
        getTasks();
    }, [])


    const getTasks = async () => {
        let cb = {
            success: async (res) => {
                console.log("success res:", res)
                // dispatch(setTasks({ res }))
            },
            error: (err) => { },
            complete: () => { },
        };

        let header = helpers.buildHeader({});
        let userAuthdetails = await helpers.userAuthdetails();
        console.log({ userAuthdetails })
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
                <InfoCart localize={localize} />
            </View>
        )
    }

    const _keyExtractor = (item, index) => "tasks" + index.toString();
    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <_Header header={helpers.getLocale(localize, "tasks", "tasks")}
                rightIcon={images.menu} rightcb
                onPress={() => props.navigation.navigate('ChangePassord')}
                onPress_signout={() => signoutHandler()}
            />
            <View style={{ borderWidth: 0 }}>
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "tasks", "search")}
                    onChangeText={value => { setuserName(value) }
                    }
                />
            </View>
            <View style={{ paddingTop: 10, height: '60%' }}>
                <FlatList
                    data={["", "", ""]}
                    // extraData={this.state}
                    renderItem={taskRender}
                    keyExtractor={_keyExtractor}
                    // refreshControl={
                    // <RefreshControl
                    //     refreshing={refreshing}
                    //     onRefresh={this._onRefresh}
                    // />
                    // }
                    // onScroll={(e) => {
                    //     console.log({ e })
                    //     if (!this.listLoading && !this.listEnded) this._renderMore();
                    // }}
                    // onEndReachedThreshold={0.2}
                    // onEndReached={(e) => {
                    //     if (!this.listLoading && !this.listEnded) this._renderMore();
                    // }}
                    // ListFooterComponent={() => {
                    //     return <View>{listLoading ? <_InlineLoader /> : null}</View>;
                    // }}
                    // ListEmptyComponent={}
                    // ItemSeparatorComponent={() => < View style={{ borderBottomWidth: 1.5, borderColor: colors.border }} />}
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
        </View >

    );
};

export default MainHoc(Tasks)

