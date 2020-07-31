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
    StyleSheet
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Input, Item } from 'native-base';
import { globals, helpers, validators, API } from '../../../Config';
// import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _B, _Layout, _ListView, _ContentType, _InlineLoader } from '../../../../../custom';
// import { mainLayoutHoc } from '../../../../../hoc';
import { mainStyle, images, sty } from '../../../Theme';
import FastImage from 'react-native-fast-image'
import _InputText from '../../Custom/InputText/_InputText'
import styles from "./Styles";
import moment from 'moment';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../Config/Libs/globals';
import MainHoc from '../../Hoc/MainHoc';
import _Button from '../../Custom/Button/_Button';
import _Header from '../../Custom/Header/_Header';
import _PairButton from '../../Custom/Button/_PairButton';


const NewTask = (props) => {
    // const campaigns = useSelector(state => state.campaigns);
    const localize = useSelector(state => state.localize);
    const [userName, setuserName] = useState("");
    // const loginData = useSelector(state => state.loginData);
    // const dispatch = useDispatch();
    // let companyPostRef = {}

    useEffect(() => {

        // console.log("Login useEffect")
        // console.log("height , width ", globals.WINDOW_HEIGHT, globals.WINDOW_WIDTH)
        // if (campaigns["favorite"] == null || campaigns["favorite"].length == 0)
        // _getFavCampaign()
    }, [])

    // const _getFavCampaign = () => {
    //     let cb = {
    //         success: (res) => {
    //             console.log("res :", res)
    //             dispatch(setCampaignProp({ prop: "favorite", arr: res.data }))
    //         },
    //         error: (err) => {
    //             console.log(
    //                 "err :", err);
    //         },
    //         complete: () => { },
    //     };

    //     // let token = await AsyncStorage.getItem('token');
    //     let header = helpers.buildHeader({ authorization: loginData.token });
    //     API.campaignFavoriteGetApi({}, cb, header);

    // }
    const addTask = () => {
        console.log("save")

    }





    const cancleButtonHandler = () => {
        console.log("cancle")
    }

    const saveButtonHandler = () => {
        // console.log("save")
        addTask()
    }

    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <_Header header={helpers.getLocale(localize, "newTask", "new_task")} />
            <View style={{}}>
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "newTask", "title")}
                    onChangeText={value => { setuserName(value) }
                    }
                />
                <_InputText
                    style={styles.TextInput1}
                    placeholder={helpers.getLocale(localize, "newTask", "name")}
                    onChangeText={value => { setuserName(value) }
                    }
                />
                <_InputText
                    style={styles.TextInput1}
                    placeholder={helpers.getLocale(localize, "newTask", "address")}
                    leftIcon={images.location}
                    onChangeText={value => { setuserName(value) }
                    }
                />
                <_InputText
                    style={styles.TextInput1}
                    placeholder={helpers.getLocale(localize, "newTask", "description")}
                    onChangeText={value => { setuserName(value) }
                    }
                />
                <_PairButton
                    icon1={images.camera}
                    icon2={images.document}
                    icon1Style={{ height: 35, width: 35 }}
                    txtStyle1={{ color: "red" }}
                    callback1={() => { cancleButtonHandler() }}
                    callback2={() => { saveButtonHandler() }}
                    style={{ borderTopWidth: 0, paddingVertical: 2 }}
                />
            </View>
            <View style={[styles.signUpWrapper, { borderWidth: 0 }]}>
                <View style={styles.signUpView}>
                    <_PairButton
                        btnTxt1={helpers.getLocale(localize, "task", "cancel")}
                        btnTxt2={helpers.getLocale(localize, "task", "save")}
                        txtStyle1={{ color: "red", }}
                        callback1={() => { cancleButtonHandler() }}
                        callback2={() => { saveButtonHandler() }}
                    />
                </View>
            </View>
        </View >

    );
};

export default MainHoc(NewTask)

