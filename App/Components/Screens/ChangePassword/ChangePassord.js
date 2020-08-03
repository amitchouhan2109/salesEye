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
// import { Input, Item } from 'native-base';ss
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
import AsyncStorage from '@react-native-community/async-storage';



const ChangePassword = (props) => {
    // const campaigns = useSelector(state => state.campaigns);
    const localize = useSelector(state => state.localize);
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [customerId, setcustomerId] = useState("");
    const [checked, setchecked] = useState(false);

    const loginData = useSelector(state => state.loginData);
    console.log("logindata", loginData)
    // const dispatch = useDispatch();
    // let companyPostRef = {}

    useEffect(() => {

        // console.log("Login useEffect")
        // console.log("height , width ", globals.WINDOW_HEIGHT, globals.WINDOW_WIDTH)
        // if (campaigns["favorite"] == null || campaigns["favorite"].length == 0)
        // _getFavCampaign()
    }, [])
    const resetPassword = async () => {
        let token = await AsyncStorage.getItem('token');
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        console.log("token", token)
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    console.log("success res:", res)

                },
                error: (err) => { },
                complete: () => { },
            };

            let header = helpers.buildHeader({ authorization: token });
            console.log('header', header)
            let data = {
                "username": userName,
                "password": password,
                "api_key": globals.API_KEY
            };

            API.resetpassword(data, cb, header);
        } else {
            // getEndPoint()
        }

    }





    const signinHandler = () => {
        console.log("signInHandler")
        // _getFavCampaign()
        resetPassword()
    }

    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <_Header header={helpers.getLocale(localize, "changePassword", "change_password")} />
            <View style={{}}>
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "changePassword", "current_password")}
                    onChangeText={value => { setuserName(value) }
                    }
                />
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "changePassword", "new_password")}
                    onChangeText={value => { setpassword(value) }
                    }
                />
                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "changePassword", "repeat_password")}
                    onChangeText={value => { setpassword(value) }
                    }
                />
            </View>
            <View style={styles.signUpWrapper}>
                <View style={styles.signUpView}>
                    <_Button
                        btnTxt={helpers.getLocale(localize, "changePassword", "save")}
                        callback={signinHandler} />
                </View>
            </View>
        </View >

    );
};

export default MainHoc(ChangePassword)

