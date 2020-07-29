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
    useEffect(() => {
        // console.log("Login useEffect")
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
            {infoRow("task_no", "INC1234", { fontWeight: "bold", fontFamily: "MyriadPro-Semibold" })}
            {infoRow("name", "John")}
            {infoRow("address", "kalvarijos str. 12")}
            {infoRow("title", "Trouble")}
            {infoRow("status", "In Progress", { color: "blue" })}
            {infoRow("task_date", "2020-06-27")}
            {/* {infoRow("description", "Test")} */}

        </View >

    );

};

export default InfoCart;

