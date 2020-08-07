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
import { login } from '../../../Redux/Actions/LoginAction'
import Loader from '../../Custom/Loader/Loader'



const Login = (props) => {
    const localize = useSelector(state => state.localize);
    const [userName, setuserName] = useState(!globals.live ? "ace@yopmail.com" : "");
    const [password, setpassword] = useState(!globals.live ? "123456" : "");
    const [customerId, setcustomerId] = useState("");
    const [checked, setchecked] = useState(false);
    const [loading, setloading] = useState(false);
    const [emailValid, setemailValid] = useState("");
    const [passwordValid, setpasswordValid] = useState("");
    // const loginData = useSelector(state => state.loginData);

    const dispatch = useDispatch();

    useEffect(() => {
        checkRemember()
    }, [])

    const checkRemember = async () => {
        const remeber = await AsyncStorage.getItem('RemeberMe');
        const remebervalue = JSON.parse(remeber)
        setchecked(remebervalue)
    }

    const signinHandler = () => {
        getEndPoint();
        // props.navigation.navigate('Tasks')
    }

    const checkApiBaseUrl = async () => {
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl) {
        } else {
            getEndPoint()
        }
    }
    const toggleRememberMe = async () => {
        await AsyncStorage.setItem('RemeberMe', JSON.stringify(!checked));
        setchecked(!checked)
    }

    const logInUser = () => {
        const emailError = helpers.validation('email', userName)
        const passwordError = helpers.validation('password', password)
        setemailValid(emailError)
        setpasswordValid(passwordError)

        if (emailError == " " && passwordError == " ") {
            setloading(true)

            let cb = {
                success: async (res) => {
                    console.log("res :", res)
                    await AsyncStorage.setItem("userAuthDetails", JSON.stringify(res[0]));
                    await AsyncStorage.setItem("token", res[0].token);
                    await AsyncStorage.setItem("userName", userName);

                    dispatch(login({ res }))
                    setloading(false)
                    props.navigation.navigate('Tasks')

                },
                error: (err) => {
                    setloading(false)
                    setTimeout(() => {
                        Alert.alert("Error", err.message)
                    }, 400);
                },
                complete: () => {
                    setloading(false)
                },
            };

            let header = helpers.buildHeader({});
            let data = {
                username: userName,
                password: password,
                api_key: globals.API_KEY
            };
            API.loginUser(data, cb, header);

        }
        else {
            Alert.alert("Fill the Required Detail")
        }
    }

    const getEndPoint = () => {
        let cb = {
            success: async (res) => {
                setloading(false)
                if (res.error === null) {
                    await AsyncStorage.setItem("baseUrl", res.result.ws_url);
                    logInUser()
                } else {
                    Alert.alert('Error in fetch end Point', 'Authentication failed');
                }

            },
            error: (err) => {
                setloading(false)
                setTimeout(() => {
                    Alert.alert("Error", err.message)
                }, 200);
            },
            complete: () => { setloading(false) },
        };
        setloading(true)
        let header = helpers.buildHeader({});
        let data = {
            company_code: "app"
        };
        API.getEndPoint(data, cb, header);
    };

    return (

        <View style={[mainStyle.rootView, styles.container]}>
            <Loader
                loading={loading} />
            <View style={{}}>
                <View style={styles.logoWrap}>
                    <FastImage
                        style={styles.logo}
                        source={images.logo}
                        resizeMode={"contain"}
                    />
                </View>
                <View style={styles.headingWarp}>
                    <Text allowFontScaling={false} style={styles.headingText}> {helpers.getLocale(localize, "login", "customer_portal")} </Text>
                </View>
            </View>
            <View style={{}}>
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "login", "userName")}
                    onChangeText={value => { setuserName(value) }}
                    value={userName}
                    // onBlur={()}
                    onBlur={() => {
                        setemailValid(() =>
                            helpers.validation('email', userName),
                        )
                    }}
                    errMsg={<Text>{emailValid}</Text>}

                />
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "login", "password")}
                    onChangeText={value => { setpassword(value) }}
                    value={password}
                    onBlur={() => {
                        setpasswordValid(() =>
                            helpers.validation('password', password),
                        )
                    }}
                    errMsg={<Text allowFontScaling={false}>{passwordValid}</Text>}

                />
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "login", "customerId")}
                    onChangeText={value => { setcustomerId(value) }}
                    value={customerId}
                />
                <View style={styles.checkboxWrapper}>
                    <TouchableOpacity
                        onPress={() => toggleRememberMe()}
                        style={{ ...sty.fRow, paddingTop: 0, paddingLeft: 10, borderWidth: 0, width: "60%", ...sty.aCenter }}>
                        <FastImage
                            style={styles.checkBoxlogo}
                            source={checked ? images.checked : images.unchecked}
                            resizeMode={"contain"}
                        />
                        <Text allowFontScaling={false} style={styles.rememberMeText}> {helpers.getLocale(localize, "login", "rememberMe")} </Text>
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
                        onPress={() => {
                            // props.navigation.navigate('SignUp')
                            props.navigation.navigate('ForgetPassword')
                        }}
                        style={styles.forgetPass}>
                        <Text allowFontScaling={false} style={styles.forgetPassText}> {helpers.getLocale(localize, "login", "forgotPassword")} </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.signUpWrapper}>
                <View style={styles.signUpView}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('SignUp')
                            // props.navigation.navigate('ChangePassord')

                            // checkApiBaseUrl()
                        }}
                        style={styles.signUp}>
                        <Text allowFontScaling={false} style={styles.signUpText}> {helpers.getLocale(localize, "login", "signUp")} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >

    );
};

export default MainHoc(Login)

