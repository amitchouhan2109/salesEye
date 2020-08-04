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
import _Header from '../../Custom/Header/_Header';
import Loader from '../../Custom/Loader/Loader'


import AsyncStorage from '@react-native-community/async-storage';


const SignUp = (props) => {
    // const campaigns = useSelector(state => state.campaigns);
    const localize = useSelector(state => state.localize);
    const [userName, setuserName] = useState("");
    const [lastName, setlastName] = useState("");
    const [company, setcompany] = useState("");
    const [phoneNo, setphoneNo] = useState("");
    const [email, setemail] = useState("");
    const [address, setaddress] = useState("");
    const [city, setcity] = useState("");
    const [loading, setloading] = useState(false);
    const [fNameValid, setfNameValid] = useState("");
    const [lNameValid, setlNameValid] = useState("");
    const [phoneNoValid, setphoneNoValid] = useState("");
    const [emailValid, setemailValid] = useState("");
    const [addressValid, setaddressValid] = useState("");
    const [cityValid, setcityValid] = useState("");
    const [comapanyValid, setcompanyValid] = useState("");






    // const [loading, setloading] = useState(false);




    // const loginData = useSelector(state => state.loginData);
    // const dispatch = useDispatch();
    // let companyPostRef = {}

    useEffect(() => {

        // console.log("Login useEffect")
        // console.log("height , width ", globals.WINDOW_HEIGHT, globals.WINDOW_WIDTH)
        // if (campaigns["favorite"] == null || campaigns["favorite"].length == 0)
        // _getFavCampaign()
    }, [])

    const signinHandler = () => {
        console.log("signInHandler")
        getEndPoint()
        // signupUser()
    }

    const signupUser = () => {
        const fNameError = helpers.validation('Name', userName)
        const lNameError = helpers.validation('lastName', lastName)
        const phoneNoError = helpers.validation('phoneNo', phoneNo)
        const addressError = helpers.validation('Address', address)
        const emailError = helpers.validation('email', email)
        const cityError = helpers.validation('City', city)
        setfNameValid(fNameError)
        setlNameValid(lNameError)
        setemailValid(emailError)
        setphoneNoValid(phoneNoError)
        setaddressValid(addressError)
        setcityValid(cityError)
        setloading(true)
        if (fNameError == " " && lNameError == " " && phoneNoError == " " && addressError == " " && emailError == " "
            && cityError == " " && phoneNoError == " ") {

            let cb = {
                success: async (res) => {
                    console.log("success res:", res)
                    setloading(false)
                    Alert.alert(" Success", "Registerd Successfully !")
                },
                error: (err) => {
                    setloading(false)
                    Alert.alert("Error", " Registration Failed")

                },
                complete: () => {
                    setloading(false)
                },
            };

            let header = helpers.buildHeader({});
            console.log({ userName, lastName, company, phoneNo, email, address, city })
            let data = {
                firstname: userName,
                lastname: lastName,
                phone: phoneNo,
                email: email,
                street: address,
                city: city,
                // post_code: "LT-12345",
                api_key: globals.API_KEY
            };
            API.registerUser(data, cb, header);
        }
        else {
            setloading(false)
            Alert.alert("Fiil the Required Fields")
        }
    }

    const getEndPoint = () => {
        let cb = {
            success: async (res) => {
                console.log("success res:", res)
                if (res.error === null) {
                    await AsyncStorage.setItem("baseUrl", res.result.ws_url);
                    signupUser()

                } else {
                    Alert.alert('Error in fetch end Point', 'Authentication failed');
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
            <Loader
                loading={loading} />
            <_Header header={helpers.getLocale(localize, "signIn", "signUp")} />
            <ScrollView style={{}}>
                <View style={{}}>
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "first_name")}
                        onChangeText={value => setuserName(value)}
                        value={userName}
                        onBlur={() => {
                            setfNameValid(() =>
                                helpers.validation('Name', userName),
                            )
                        }}
                        errMsg={<Text>{fNameValid}</Text>}
                    />
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "last_name")}
                        onChangeText={value => setlastName(value)}
                        value={lastName}
                        onBlur={() => {
                            setlNameValid(() =>
                                helpers.validation('lastName', lastName),
                            )
                        }}
                        errMsg={<Text>{lNameValid}</Text>}
                    />
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "company")}
                        onChangeText={value => setcompany(value)}
                        value={company}

                    />
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "phone")}
                        onChangeText={value => setphoneNo(value)}
                        value={phoneNo}
                        onBlur={() => {
                            setphoneNoValid(() =>
                                helpers.validation('phoneNo', phoneNo),
                            )
                        }}
                        errMsg={<Text>{phoneNoValid}</Text>}
                    />
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "email")}
                        onChangeText={value => setemail(value)}
                        value={email}
                        onBlur={() => {
                            setemailValid(() =>
                                helpers.validation('email', email),
                            )
                        }}
                        errMsg={<Text>{emailValid}</Text>}
                    />
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "address")}
                        onChangeText={value => setaddress(value)}
                        value={address}
                        onBlur={() => {
                            setaddressValid(() =>
                                helpers.validation('Address', address),
                            )
                        }}
                        errMsg={<Text>{addressValid}</Text>}
                    />
                    <_InputText
                        style={styles.TextInput}
                        placeholder={helpers.getLocale(localize, "signIn", "city")}
                        onChangeText={value => setcity(value)}
                        value={city}
                        onBlur={() => {
                            setcityValid(() =>
                                helpers.validation('City', city),
                            )
                        }}
                        errMsg={<Text>{cityValid}</Text>}
                    />
                </View>
                <View style={{ marginTop: 50 }}>
                    <_Button
                        btnTxt={helpers.getLocale(localize, "signIn", "signUp")}
                        callback={signinHandler} />
                </View>


                <View style={styles.signUpWrapper}>
                    <View style={styles.signUpView}>
                        <TouchableOpacity
                            onPress={() => { props.navigation.navigate('LogIn') }}
                            style={styles.signUp}>
                            <Text style={styles.signUpText}> {helpers.getLocale(localize, "signIn", "signIn")} </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>


        </View >

    );
};

export default MainHoc(SignUp)

