import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Alert, Image, Text
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
import DocumentPicker from 'react-native-document-picker';




const NewTask = (props) => {
    // const campaigns = useSelector(state => state.campaigns);
    const localize = useSelector(state => state.localize);
    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [customer_id, setcustomer_id] = useState("");
    const [edit, setedit] = useState(false);
    const [picture, setpicture] = useState("");
    const [document, setdocument] = useState("");

    const [initialLoading, setinitialLoading] = useState(true);
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
                    setinitialLoading(false)
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
                    setTimeout(() => { setloading(false) }, 300)
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
                uploadDoc()
                // img_filename: file,
                //     selectedImage: response
                // this.setState({
                //     avatarSource: source,
                // });
            }
        });
    }
    const uploadDoc = async () => {
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    console.log({ res })
                },
                error: (err) => {
                    Alert.alert("Failed")
                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "task_id": 881613,
                "filename": "2018-07-10 15:09:56.png",
                "photo": "iVBORw0KGgoAAAANSUhEUgAAAwYAAAQICAIAAAA4CVt9AAAAA3NCSVQFBgUzC42AAAAgAElEQVR4\nnOy9X2wcV3ro+Yk+VL7SFD2n7G6nakJ6WI6YUSmSV92RNMOeyAP1QJ41fe3A8p0EsXaAzWrvw+7k",
                "api_key": globals.API_KEY,
                //     {
                //     "user_id": 881235, "token": "D3A06CAAD6B92AC5E14EB19B0F688C61",
                //         "task_id": 881241, "filename": "2018-07-10 15:09:56.png",
                //             "photo": "iVBORw0KGgoAAAANSUhEUgAAAwYAAAQICAIAAAA4CVt9AAAAA3NCSVQFBgUzC42AAAAgAElEQVR4\nnOy9X2wcV3ro+Yk+VL7SFD2n7G6nakJ6WI6YUSmSV92RNMOeyAP1QJ41fe3A8p0EsXaAzWrvw+7k",
                //         "api_key": "TqKGLk2e"
                // }
            };
            console.log("data", data)
            API.postDocument(data, cb, header);
        } else {
            // getEndPoint()
        }
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
    const addDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images,
                DocumentPicker.types.pdf
                ],
            });
            setdocument(res.name)
            console.log("res", res)
            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("cancled")
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <Loader
                loading={loading} />
            {initialLoading ? < Loader
                name /> :
                <>
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
                            callback2={() => { addDocument() }}
                            style={{ borderTopWidth: 0, paddingVertical: 2 }}
                        />
                        <Image source={picture} style={{ width: 50, height: 50, marginTop: 10 }} />
                        <Text>{document}</Text>
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
                </>}
        </View >

    );
};

export default MainHoc(NewTask)

