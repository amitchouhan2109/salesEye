import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Alert, Image, Text, FlatList
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
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs'


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
    const [document, setdocument] = useState(" ");
    const [task_id, settask_id] = useState("");
    const [uploadedDoc, setuploadedDoc] = useState([]);
    const [uploadedImg, setuploadedImg] = useState([]);

    const Document = [];


    const [initialLoading, setinitialLoading] = useState(true);
    // const [editAddress, seteditAddress] = useState("");
    const [loading, setloading] = useState(false);

    useEffect(() => {
        get_customer_data()
    }, [])

    const get_customer_data = async () => {
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
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
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    setTimeout(
                        () => {
                            setloading(false)
                        }, 2000
                    )
                    settask_id(res.record_id)
                    Alert.alert('Success', ' Your Task Save Successfully ',
                    );

                },
                error: (err) => {
                    setloading(false)
                    Alert.alert("error", err.message)
                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            console.log('header', header)
            let newdata = [
                edit ?
                    {
                        "object": name,
                        "address": address,
                        "description": description,
                        "title": title,
                    } :
                    {
                        "customer_id": customer_id,
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
        if (!task_id) {
            Alert.alert("Error", "Firstly Save the task then upload documents")
        }
        else {
            const options = {
                title: 'Select Photo',
                // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };
            ImagePicker.showImagePicker(options, (response) => {
                const base64Value = response.data;
                console.log(base64Value, "123")
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    // const file = response.fileName
                    // const source = { uri: response.uri };
                    setTimeout(() => { setpicture("Photo1") }, 3000)
                    console.log('picker resp', response)
                    uploadDoc(response.fileName, response.uri, base64Value, " ", "Photo1")
                }
            });
        }
    }
    const uploadDoc = async (fileName, uri, photo, doc, image) => {
        setloading(true)
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    console.log({ res })
                    Alert.alert(
                        'Success',
                        ' Document Uploaded Successfully ',
                        [
                            {
                                text: 'OK', onPress: () => {
                                    const source = { uri: uri };

                                    // setpicture(source)
                                    console.log("image", image)
                                    if (image != " ") {
                                        const item = new Object();
                                        const arr = [...uploadedImg]
                                        arr.push(item)
                                        const da = [...Document, item]

                                        const img = { source }
                                        Document.push(item);
                                        setuploadedImg(arr)

                                        // setdocument(Document)
                                        console.log(Document, "Doc", da, uploadedImg, arr)
                                        // console.log(document, "Doc", da)
                                    }
                                    else {
                                        const item = new Object();
                                        const array = [...uploadedDoc]
                                        array.push(item)
                                        setuploadedDoc(array)
                                        console.log("Doc2", uploadedDoc, array)

                                    }

                                    return true
                                }
                            },
                        ]
                    );
                    setTimeout(() => { setloading(false) }, 300)
                },
                error: (err) => {
                    setloading(false)
                    Alert.alert("Error", " Something Went Wrong While Uploading Document")
                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "task_id": task_id,
                "filename": fileName,
                "photo": photo,
                "api_key": globals.API_KEY,

            };
            console.log("data", data)
            API.postDocument(data, cb, header);
        } else {
            // getEndPoint()
        }

    }
    console.log("Dik", Document)
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
        if (!task_id) {
            Alert.alert("Error", "Firstly Save the task then upload documents")
        }
        else {
            DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles]
            })
                .then(res => {
                    console.log('res', res, res.uri)
                    RNFS.readFile(res.uri, "base64").then(result => {
                        console.log(result, '123')
                        uploadDoc(res.name, res.uri, result, "Doc1 ", " ")
                        setTimeout(() => { setdocument("Doc1") }, 3000)
                    })

                    console.log("b", b)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    const signout = async () => {
        let token = await AsyncStorage.getItem('token');
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    setloading(false)
                    AsyncStorage.removeItem('userAuthDetails');
                    AsyncStorage.removeItem('token');
                    AsyncStorage.removeItem('userName');
                    props.navigation.navigate('LogIn')

                },
                error: (err) => {
                    setloading(false)
                    setTimeout(() => {
                        props.navigation.navigate('LogIn')
                        Alert.alert("Error", err.message)
                    }, 200);

                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "portal_user": userAuthdetails.portal_user,
                "api_key": globals.API_KEY
            };
            API.signOut(data, cb, header);
        } else {
            // getEndPoint()
        }

    }


    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <Loader
                loading={loading} />
            {initialLoading ? < Loader
                name /> :
                <>
                    <_Header header={helpers.getLocale(localize, "newTask", "new_task")}
                        rightIcon={images.menu} rightcb
                        onPress_signout={() => signout()}
                        onPress={() => props.navigation.navigate('ChangePassord')}
                    />
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
                        <View style={{ paddingVertical: 3, paddingHorizontal: 15 }}>
                            {/* <Image source={picture} style={{ width: 50, height: 50, marginTop: 10 }} /> */}
                            {/* {picture ? <Text style={{ fontSize: 15 }}>{picture}</Text> : null}
                            {document ? <Text style={{ fontSize: 15 }}>{document}</Text> : null} */}
                            <FlatList
                                data={uploadedImg}
                                renderItem={({ item, index }) =>
                                    <Text style={styles.textColor}>Photo{index + 1}</Text>}
                                // keyExtractor={_keyExtractor}
                                keyExtractor={(item, index) => index.toString()}
                                removeClippedSubviews={Platform.OS == "android" ? true : false}

                            />
                            <FlatList
                                data={uploadedDoc}
                                renderItem={({ item, index }) =>
                                    <Text style={styles.textColor}>Doc{index + 1}</Text>}
                                keyExtractor={(item, index) => index.toString()}
                                removeClippedSubviews={Platform.OS == "android" ? true : false}
                            />
                        </View>

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

