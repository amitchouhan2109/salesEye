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
import { globals, helpers, validators, } from '../../../../Config';
// import { _ErrorModal, _GradiantView, _Lang, _ListBox, _Loading, _Spacer, _Icon, _Button, _B, _Layout, _ListView, _ContentType, _InlineLoader } from '../../../../../custom';
// import { mainLayoutHoc } from '../../../../../hoc';
import { mainStyle, images, sty } from '../../../../Theme';
import FastImage from 'react-native-fast-image'
import _InputText from '../../../Custom/InputText/_InputText'
import styles from "./Styles";
import moment from 'moment';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../../Config/Libs/globals';
import MainHoc from '../../../Hoc/MainHoc';
import _Button from '../../../Custom/Button/_Button';
import _Header from '../../../Custom/Header/_Header';


const InfoCart = (props) => {
    const localize = useSelector(state => state.localize);
    const [taskno, settaskno] = useState("");
    const [userName, setuserName] = useState("");
    const [address, setaddress] = useState("");
    const [title, settitle] = useState("");
    const [status, setstatus] = useState("");
    const [taskDate, settaskDate] = useState("");


    useEffect(() => {
        // console.log("infocart useEffect")
        const Tasks = props.tasks.item

        console.log(Tasks, "tasks55")
        // if (props.tasks !== undefined) {
        //     console.log("infocart useEffect", props.tasks.res[0].tasks)
        //     // const TaskData = props.tasks.res[0].tasks
        const date = Tasks.start_date
        const Date = date.split(' ')[0]
        const name = Tasks.object.split(',')[0]
        setstatus(Tasks.status)
        settaskno(Tasks.id)
        setuserName(name)
        setaddress(Tasks.address)
        settitle(Tasks.task_type)
        settaskDate(Date)
        // }
    }, [])

    const signinHandler = () => {
        console.log("signInHandler")
    }

    const infoRow = (tag, value, fontStyle = {}) => {
        return (
            <View style={{ ...sty.fRow, }}>
                <View style={{ width: "57%", borderWidth: 0, ...sty.jCenter }}>
                    <Text allowFontScaling={false} style={[{ fontSize: 20, borderWidth: 0, lineHeight: 22 }]}>{helpers.getLocale(props.localize, "task", tag) + ":"}</Text>
                </View >
                <View style={{ width: "43%", borderWidth: 0, ...sty.jCenter, paddingLeft: 0, borderWidth: 0, }}>
                    <Text allowFontScaling={false} style={[{ fontSize: 20, borderWidth: 0, lineHeight: 22 }, fontStyle]}>{value}</Text>
                </View >
            </View>
        )
    }

    return (
        <View style={[styles.container, { paddingVertical: 5, borderWidth: 0 }]}>
            {infoRow("task_no", taskno, { fontWeight: "bold", fontFamily: "MyriadPro-Semibold" })}
            {infoRow("name", userName)}
            {infoRow("address", address)}
            {infoRow("title", title)}
            {infoRow("status", status, { color: "blue" })}
            {infoRow("task_date", taskDate)}
            {/* {infoRow("description", "Test")} */}

        </View >

    );

};

export default InfoCart;

