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
    StyleSheet,
    Alert
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

import AsyncStorage from '@react-native-community/async-storage';


const Login = (props) => {
    // const campaigns = useSelector(state => state.campaigns);
    const localize = useSelector(state => state.localize);
    const [userName, setuserName] = useState(!globals.live ? "ace1@yopmail.com" : "");
    const [password, setpassword] = useState(!globals.live ? "vtvxbjcg" : "");
    const [customerId, setcustomerId] = useState("");
    const [checked, setchecked] = useState(false);

    // const loginData = useSelector(state => state.loginData);
    // const dispatch = useDispatch();
    // let companyPostRef = {}

    useEffect(() => {

        console.log("Login useEffect")
        // console.log("height , width ", globals.WINDOW_HEIGHT, globals.WINDOW_WIDTH)
        // if (campaigns["favorite"] == null || campaigns["favorite"].length == 0)
        // _getFavCampaign()
    }, [])

    const signinHandler = () => {
        props.navigation.navigate('Tasks')
        // getEndPoint();
    }

    const checkApiBaseUrl = async () => {
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        console.log("baseUrl :", baseUrl)

        if (baseUrl) {
            console.log("baseUrl 1:")
        } else {
            console.log("baseUrl 2:")
            getEndPoint()
        }
    }

    const logInUser = () => {
        let cb = {
            success: async (res) => {
                console.log("success res:", res)
                console.log("success res [0]", res[0])
                console.log("success res [0] user_id", res[0].user_id)
                console.log("success res [0] token", res[0].token)

                await AsyncStorage.setItem("userAuthDetails", JSON.stringify(res[0]));
                await AsyncStorage.setItem("token", res[0].token);

                props.navigation.navigate('Tasks')

            },
            error: (err) => { },
            complete: () => { },
        };

        let header = helpers.buildHeader({});
        let data = {
            username: userName,
            password: password,
            api_key: globals.API_KEY
        };
        API.loginUser(data, cb, header);
        // API.registerUser(data, cb, header);
    }

    const getEndPoint = () => {
        let cb = {
            success: async (res) => {
                console.log("success res:", res)
                if (res.error === null) {
                    await AsyncStorage.setItem("baseUrl", res.result.ws_url);
                    logInUser()
                } else {
                    Alert.alert('Error in fetch end Point', 'Authentication failed',);
                }

            },
            error: (err) => { },
            complete: () => { },
        };

        let header = helpers.buildHeader({});
        let data = {
            company_code: "app"
        };
        API.getEndPoint(data, cb, header);
    };

    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <View style={{}}>
                <View style={styles.logoWrap}>
                    <FastImage
                        style={styles.logo}
                        source={images.logo}
                        resizeMode={"contain"}
                    />
                </View>
                <View style={styles.headingWarp}>
                    <Text style={styles.headingText}> {helpers.getLocale(localize, "login", "customer_portal")} </Text>
                </View>
            </View>
            <View style={{}}>
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "login", "userName")}
                    onChangeText={value => { setuserName(value) }}
                    value={userName}
                />
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "login", "password")}
                    onChangeText={value => { setpassword(value) }}
                    value={password}
                />
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "login", "customerId")}
                    onChangeText={value => { setcustomerId(value) }}
                    value={customerId}
                />
                <View style={styles.checkboxWrapper}>
                    <TouchableOpacity
                        onPress={() => { setchecked(!checked) }}
                        style={{ ...sty.fRow, paddingTop: 0, paddingLeft: 10, borderWidth: 0, width: "60%", ...sty.aCenter }}>
                        <FastImage
                            style={styles.checkBoxlogo}
                            source={checked ? images.checked : images.unchecked}
                            resizeMode={"contain"}
                        />
                        <Text style={styles.rememberMeText}> {helpers.getLocale(localize, "login", "rememberMe")} </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ paddingTop: 60 }}>
                <_Button
                    style={styles.button}
                    btnTxt={helpers.getLocale(localize, "login", "signIn")}
                    callback={signinHandler} />
                <View style={styles.forgetPassView}>
                    <TouchableOpacity
                        onPress={() => { props.navigation.navigate('ForgetPassword') }}
                        style={styles.forgetPass}>
                        <Text style={styles.forgetPassText}> {helpers.getLocale(localize, "login", "forgotPassword")} </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.signUpWrapper}>
                <View style={styles.signUpView}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('SignUp')
                            // checkApiBaseUrl()
                        }}
                        style={styles.signUp}>
                        <Text style={styles.signUpText}> {helpers.getLocale(localize, "login", "signUp")} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >

    );
};

export default MainHoc(Login)

