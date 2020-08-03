import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Alert, Image
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
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Custom/Loader/Loader'
import ImagePicker from 'react-native-image-picker';




const NewTask = (props) => {
    // const campaigns = useSelector(state => state.campaigns);
    const localize = useSelector(state => state.localize);
    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [customer_id, setcustomer_id] = useState("");
    const [edit, setedit] = useState(false);
    const [picture, setpicture] = useState(false);

    // const [editAddress, seteditAddress] = useState("");



    const [loading, setloading] = useState(false);

    // const loginData = useSelector(state => state.loginData);
    // const dispatch = useDispatch();
    // let companyPostRef = {}

    useEffect(() => {
        get_customer_data()

        // console.log("Login useEffect")
        // console.log("height , width ", globals.WINDOW_HEIGHT, globals.WINDOW_WIDTH)
        // if (campaigns["favorite"] == null || campaigns["favorite"].length == 0)
        // _getFavCampaign()
    }, [])

    const get_customer_data = async () => {
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        console.log("token", { userAuthdetails })
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    console.log({ res })
                    // console.log(res[0])
                    let customer_data = res[0].objects
                    // console.log(customer_data[0], "cus")
                    setname(customer_data[0].name)
                    setaddress(customer_data[0].address)
                    setcustomer_id(customer_data[0].customer_id)
                },
                error: (err) => {
                    Alert.alert(err)
                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            console.log('header', header)
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "portal_user": userAuthdetails.portal_user,
                "api_key": globals.API_KEY
            };
            API.get_customers_data(data, cb, header);
        }

    }
    const addTask = async () => {
        setloading(true)
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        console.log("token", { userAuthdetails })
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    setloading(false)
                    console.log(res)
                    Alert.alert(
                        'Success',
                        ' Your Task Save Successfully ',
                        [
                            {
                                text: 'OK', onPress: () => {
                                    props.navigation.navigate('Tasks')
                                }
                            },
                        ]
                    );

                },
                error: (err) => {
                    setloading(false)
                    Alert.alert("error")
                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            console.log('header', header)
            let newdata = [
                edit ?
                    {
                        // "object": "Customer",
                        "object": name,
                        "address": address,
                        "description": description,
                        "title": title,
                    } :
                    {
                        "customer_id": customer_id,
                        // "object": "Customer",
                        "object": name,
                        "address": address,
                        "description": description,
                        "title": title,
                    }
            ]
            console.log('newdata', newdata)
            let data = {
                "user_id": userAuthdetails.user_id,
                "task_actions": newdata,
                "token": userAuthdetails.token,
                "portal_user": userAuthdetails.portal_user,
                "api_key": globals.API_KEY
            };
            setloading(false)
            API.sync_data(data, cb, header);
        }
    }
    const addPicture = () => {

        const options = {
            title: 'Select Avatar',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const file = response.fileName
                const source = { uri: response.uri };
                setpicture(source)
                console.log('picker resp', response)
                // img_filename: file,
                //     selectedImage: response
                // this.setState({
                //     avatarSource: source,
                // });
            }
        });
    }

    const onEdit = () => {
        setedit(true)
    }


    const cancleButtonHandler = () => {
        console.log("cancle")
    }

    const saveButtonHandler = () => {
        addTask()
    }

    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <Loader
                loading={loading} />
            <_Header header={helpers.getLocale(localize, "newTask", "new_task")} />
            <View style={{}}>

                <_InputText
                    style={styles.TextInput}
                    placeholder={helpers.getLocale(localize, "newTask", "title")}
                    onChangeText={value => { settitle(value) }
                    }
                />
                <_InputText
                    style={styles.TextInput1}
                    placeholder={helpers.getLocale(localize, "newTask", "name")}
                    value={name}
                    onChangeText={value => {
                        setname(value),
                            onEdit()
                    }
                    }
                />
                <_InputText
                    style={styles.TextInput1}
                    placeholder={helpers.getLocale(localize, "newTask", "address")}
                    value={address}
                    leftIcon={images.location}
                    onChangeText={value => {
                        setaddress(value), onEdit()
                        // emailValid: validation('email', value)
                    }}

                />
                <_InputText
                    style={styles.TextInput1}
                    placeholder={helpers.getLocale(localize, "newTask", "description")}
                    onChangeText={value => { setdescription(value) }
                    }
                />
                <_PairButton
                    icon1={images.camera}
                    icon2={images.document}
                    icon1Style={{ height: 35, width: 35 }}
                    txtStyle1={{ color: "red" }}
                    callback1={() => { addPicture() }}
                    callback2={() => { saveButtonHandler() }}
                    style={{ borderTopWidth: 0, paddingVertical: 2 }}
                />
                <Image source={picture} style={{ width: 50, height: 50, marginTop: 10 }} />
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

