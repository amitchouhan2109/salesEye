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
import { globals, helpers, validators, API, } from '../../../Config';
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


const ForgetPassword = (props) => {
    // const campaigns = useSelector(state => state.campaigns);
    const localize = useSelector(state => state.localize);
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [customerId, setcustomerId] = useState("");
    const [checked, setchecked] = useState(false);

    // const loginData = useSelector(state => state.loginData);
    // const dispatch = useDispatch();
    // let companyPostRef = {}

    useEffect(() => {

        // console.log("Login useEffect")
        // console.log("height , width ", globals.WINDOW_HEIGHT, globals.WINDOW_WIDTH)
        // if (campaigns["favorite"] == null || campaigns["favorite"].length == 0)
        // _getFavCampaign()
    }, [])

    const forgetPawword = async () => {
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

        // let userId = await AsyncStorage.getItem("userAuthDetails",);
        // let token = await AsyncStorage.getItem("token");
        console.log({ userAuthdetails })
        let data = {
            "user_id": userName,
            "api_key": globals.API_KEY
        };

        API.forgetPassword(data, cb, header);
    }



    const signinHandler = () => {
        console.log("signInHandler")
    }

    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <_Header header={helpers.getLocale(localize, "forgetPassword", "forget_password")} />
            <View style={{}}>
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "forgetPassword", "userName")}
                    onChangeText={value => { setuserName(value) }}
                    value={userName}
                />
            </View>
            <View style={styles.signUpWrapper}>
                <View style={styles.signUpView}>
                    <_Button
                        btnTxt={helpers.getLocale(localize, "forgetPassword", "send")}
                        callback={forgetPawword} />
                </View>
            </View>
        </View >

    );
};

export default MainHoc(ForgetPassword)

