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
    StyleSheet, Modal, TouchableHighlight
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Input, Item } from 'native-base';
import { globals, helpers, validators, API } from '../../../Config';
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
import _PairButton from '../../Custom/Button/_PairButton';
import InfoCart from '../ContentType/InfoCart/InfoCart';
import AsyncStorage from '@react-native-community/async-storage';



const Task = (props) => {
    // const campaigns = useSelector(state => state.campaigns);
    const localize = useSelector(state => state.localize);
    // const tasks = useSelector(state => state.);
    // const tasks = useSelector(state => state.tasks);
    const { task } = props.route.params;
    const [message, setmessage] = useState("");
    const [modalVisible, setmodalVisible] = useState(false);


    // const loginData = useSelector(state => state.loginData);
    // const dispatch = useDispatch();
    // let companyPostRef = {}

    useEffect(() => {
        // getCommentData()
    }, [])

    const getCommentData = async () => {
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    console.log({ res })
                },
                error: (err) => {
                    Alert.alert("Failed")
                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            let data = {
                // "user_id": "881565",
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "portal_user": userAuthdetails.portal_user,
                "task_id": 881567,
                "api_key": globals.API_KEY,
            };
            console.log("data", data)
            API.getCommentData(data, cb, header);
        } else {
            // getEndPoint()
        }
    }
    const addCommentData = async () => {
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    console.log({ res })
                    toggleModal(false)
                },
                error: (err) => {
                    Alert.alert("Failed")
                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            let data = {
                "user_id": "881565",
                // "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "task_comment": message,
                "task_id": 881567,
                "task_type": "Incident",
                "api_key": globals.API_KEY,

            };
            console.log("data", data)
            API.addCommentData(data, cb, header);
        } else {
            // getEndPoint()
        }
    }

    const saveButtHandler = async () => {
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    console.log({ res })
                },
                error: (err) => {
                    Alert.alert("Failed")
                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "task_id": 881567,
                "task_type": "Incident",
                "task_evaluation": 2,
                "api_key": globals.API_KEY,
            };
            console.log("data", data)
            API.saveEvalutionData(data, cb, header);
        } else {

        }
    }

    const toggleModal = (visible) => {
        setmodalVisible(visible);
    }

    const cancleButtonHandler = () => {
        console.log("cancle")
    }

    const saveButtonHandler = () => {
        console.log("save")
        // saveButtHandler()

    }
    const commentRender = () => {
        console.log("cancle")
    }


    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <_Header header={helpers.getLocale(localize, "task", "task")} />
            <View style={{ marginTop: 20, height: 1.5, backgroundColor: colors.primaryColor }} />
            <View style={{ paddingTop: 10 }}>
                <InfoCart localize={localize} tasks={task} />

                {/* <InfoCart localize={localize} /> */}
            </View>
            <View style={{ marginTop: 10, }}>
                <View style={{}}>
                    <View style={{ ...sty.fRow, paddingLeft: 10, }}>
                        <FastImage
                            style={{ height: 20, width: 20, paddingLeft: 0, marginTop: 7 }}
                            source={images.downArrow}
                            resizeMode={"contain"}
                        />
                        <Text allowFontScaling={false} style={[{ fontSize: 25, paddingLeft: 10, textAlign: "center", fontWeight: "500" }]}>{helpers.getLocale(localize, "task", "documents")}</Text>
                    </View>
                    <View style={{ marginTop: 1, height: 1.5, backgroundColor: colors.primaryColor }} />
                    {true ? null : <View style={{ marginTop: 10, height: 1.5, backgroundColor: colors.primaryColor }} />}
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <View style={{}}>
                    <View style={{ ...sty.fRow, paddingLeft: 10 }}>
                        <TouchableOpacity onPress={() => getCommentData()}>
                            <FastImage
                                style={{ height: 20, width: 20, paddingLeft: 0, marginTop: 7 }}
                                source={images.downArrow}
                                resizeMode={"contain"}
                            />
                        </TouchableOpacity>
                        <Text allowFontScaling={false} style={[{ fontSize: 25, paddingLeft: 10, textAlign: "center", fontWeight: "500", }]}>{helpers.getLocale(localize, "task", "messages")}</Text>

                    </View>
                    <View style={{ marginTop: 1, height: 1.5, backgroundColor: colors.primaryColor }} />
                    {true ? null : <View style={{ marginTop: 10, height: 1.5, backgroundColor: colors.primaryColor }} />}

                    {/* <FlatList
                        data={[""]}
                        // data={task}
                        // extraData={this.state}
                        renderItem={commentRender}
                        keyExtractor={_keyExtractor} /> */}
                    <View style={{ marginTop: 20, borderWidth: 2, borderColor: "#969696" }}>
                        <TouchableOpacity style={{ ...sty.fRow }} onPress={() => toggleModal(true)}>
                            <View style={{ width: "85%", ...sty.jCenter, padding: 5, paddingLeft: 40 }}>
                                <Text allowFontScaling={false} style={{ fontSize: 29, borderWidth: 0 }}>{helpers.getLocale(localize, "task", "add_message")}</Text>
                            </View>
                            <View style={{ width: "15%", ...sty.jCenter, ...sty.aCenter }}>
                                <FastImage
                                    style={{ height: 20, width: 20, paddingLeft: 0 }}
                                    source={images.upArrow}
                                    resizeMode={"contain"}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <View style={[styles.signUpWrapper]}>
                <View style={{ ...sty.fRow, ...sty.aCenter, ...sty.jCenter, paddingBottom: 10 }}>
                    <FastImage style={styles.starImgStyle} source={images.filledStar} resizeMode={"contain"} />
                    <FastImage style={styles.starImgStyle} source={images.filledStar} resizeMode={"contain"} />
                    <FastImage style={styles.starImgStyle} source={images.filledStar} resizeMode={"contain"} />
                    <FastImage style={styles.starImgStyle} source={images.emptyStar} resizeMode={"contain"} />
                    <FastImage style={styles.starImgStyle} source={images.emptyStar} resizeMode={"contain"} />

                </View>
                <View style={styles.signUpView}>
                    <_PairButton
                        btnTxt1={helpers.getLocale(localize, "task", "cancel")}
                        btnTxt2={helpers.getLocale(localize, "task", "save")}
                        txtStyle1={{ color: "red" }}
                        callback1={() => { cancleButtonHandler() }}
                        callback2={() => { saveButtonHandler() }}
                    />
                </View>
            </View>
            <Modal animationType={"none"} transparent={true}
                visible={modalVisible}
                onRequestClose={() => this.toggleModal(false)}>
                <View style={styles.modalBackground}>
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        height: 200,
                        width: "80%",
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        padding: 10
                    }} >
                        <_InputText
                            style={styles.TextInput}
                            placeholder={helpers.getLocale(localize, "task", "add_message")}
                            onChangeText={value => { setmessage(value) }
                            }
                        />
                        <View style={{ marginTop: 20, borderWidth: 2, borderColor: "#969696" }}>

                            <TouchableOpacity style={{ ...sty.fRow }} onPress={() => addCommentData()}
                            >
                                <View style={{ width: "85%", ...sty.jCenter, padding: 5, paddingLeft: 40 }}>
                                    <Text allowFontScaling={false} style={{ fontSize: 20, borderWidth: 0 }}>{helpers.getLocale(localize, "task", "add_message")}</Text>
                                </View>
                                <View style={{ width: "15%", ...sty.jCenter, ...sty.aCenter }}>
                                    <FastImage
                                        style={{ height: 20, width: 20, paddingLeft: 0 }}
                                        source={images.upArrow}
                                        resizeMode={"contain"}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View >

    );
};

export default MainHoc(Task)

