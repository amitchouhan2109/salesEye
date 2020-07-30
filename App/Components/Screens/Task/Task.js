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
import { globals, helpers, validators, } from '../../../Config';
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


const Task = (props) => {
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

    const _getFavCampaign = () => {
        let cb = {
            success: (res) => {
                console.log("res :", res)
                dispatch(setCampaignProp({ prop: "favorite", arr: res.data }))

            },
            error: (err) => {
                console.log(
                    "err :", err);
            },
            complete: () => { },
        };

        // let token = await AsyncStorage.getItem('token');
        let header = helpers.buildHeader({ authorization: loginData.token });
        API.campaignFavoriteGetApi({}, cb, header);

    }



    const signinHandler = () => {
        console.log("signInHandler")
    }

    const cancleButtonHandler = () => {
        console.log("cancle")
    }

    const saveButtonHandler = () => {
        console.log("save")
    }

    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <_Header header={helpers.getLocale(localize, "task", "task")} />
            <View style={{ marginTop: 20, height: 1.5, backgroundColor: colors.primaryColor }} />
            {/* <View style={{ borderWidth: 1 }}> */}
            <InfoCart localize={localize} />
            {/* </View> */}
            <View style={{ marginTop: 10, }}>
                <View style={{}}>
                    <View style={{ ...sty.fRow, paddingLeft: 10, }}>
                        <FastImage
                            style={{ height: 20, width: 20, paddingLeft: 0 }}
                            source={images.downArrow}
                            resizeMode={"contain"}
                        />
                        <Text allowFontScaling={false} style={[{ fontSize: 25, paddingLeft: 10, textAlign: "center", fontWeight: "500", height: 25 }]}>{helpers.getLocale(localize, "task", "documents")}</Text>
                    </View>
                    <View style={{ marginTop: 1, height: 1.5, backgroundColor: colors.primaryColor }} />
                    {true ? null : <View style={{ marginTop: 10, height: 1.5, backgroundColor: colors.primaryColor }} />}
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <View style={{}}>
                    <View style={{ ...sty.fRow, paddingLeft: 10 }}>
                        <FastImage
                            style={{ height: 20, width: 20, paddingLeft: 0 }}
                            source={images.downArrow}
                            resizeMode={"contain"}
                        />
                        <Text allowFontScaling={false} style={[{ fontSize: 25, paddingLeft: 10, textAlign: "center", fontWeight: "500", height: 25 }]}>{helpers.getLocale(localize, "task", "messages")}</Text>
                    </View>
                    <View style={{ marginTop: 1, height: 1.5, backgroundColor: colors.primaryColor }} />

                    {true ? null : <View style={{ marginTop: 10, height: 1.5, backgroundColor: colors.primaryColor }} />}

                    <View style={{ marginTop: 20, borderWidth: 2, borderColor: "#969696" }}>

                        <TouchableOpacity style={{ ...sty.fRow }} onPress={() => {
                        }}>
                            <View style={{ width: "85%", ...sty.jCenter, padding: 5, paddingLeft: 40 }}>
                                <Text allowFontScaling={false} style={{ fontSize: 29, height: 26, borderWidth: 0 }}>{helpers.getLocale(localize, "task", "add_message")}</Text>
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
        </View >

    );
};

export default MainHoc(Task)

