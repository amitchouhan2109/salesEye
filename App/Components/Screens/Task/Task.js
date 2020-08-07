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
    StyleSheet, Modal, TouchableHighlight, Alert
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Input, Item } from 'native-base';
import { globals, helpers, validators, API } from '../../../Config';
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
import AsyncStorage from '@react-native-community/async-storage';
import StarRating from 'react-native-star-rating';
import { startClock } from 'react-native-reanimated';
import Loader from '../../Custom/Loader/Loader'




const Task = (props) => {
    // const campaigns = useSelector(state => state.campaigns);
    const localize = useSelector(state => state.localize);
    // const tasks = useSelector(state => state.);
    // const tasks = useSelector(state => state.tasks);
    const { task } = props.route.params
    const Document = task.item.documents
    console.log(task, 123, Document)
    const task_evaluation = task.item.evaluation
    console.log('evaluation', task_evaluation)
    const [message, setmessage] = useState("");
    const [modalVisible, setmodalVisible] = useState(false);
    const [msgExpand, setmsgExapnd] = useState(false);
    const [docExpand, setdocExapnd] = useState(false);
    const [starCount, setstarCount] = useState(task_evaluation);
    const [getMessage, setgetMessage] = useState([]);
    const [gMLoader, setgMLoader] = useState(false);

    // const [docCount, setdocCount] = useState("");
    var DocumentCount = []
    const [loading, setloading] = useState(false);
    if (Document && Document != undefined) {
        for (const item in Document[0]) {
            console.log(item, "docit")
        }


        for (const item of Object.entries(Document)) {
            var docCount = Object.keys(item[1]).length


            // setdocCount(docCount)
            for (var i = 0; i < docCount; i++) {
                let doc = i
                let obj = {}
                DocumentCount.push(obj)
            }

            // setdoc(item[1])

            // const items = item
            // console.log(Object.keys(items), "14")

            // console.log('items', items)
            // for (const item of Object.entries(items)) {
            //     console.log(item, "do")
            // }

        }
    }

    // const newArray = Document.map(element => {
    //     return {
    //         ...element,
    //     };
    // });
    // console.log('new', newArray[0]["881757-881753"])





    // const loginData = useSelector(state => state.loginData);
    // const dispatch = useDispatch();
    // let companyPostRef = {}

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getCommentData()
        });
        return unsubscribe;
    }, [props.navigation])



    const getCommentData = async () => {
        setgMLoader(true)
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    console.log({ res })
                    setgMLoader(false)
                    if (res[0].task_comments !== undefined) {
                        setgetMessage(res[0].task_comments)
                    }

                },
                error: (err) => {
                    Alert.alert("Failed")
                    setgMLoader(false)

                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            let data = {
                // "user_id": "881565",
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "portal_user": userAuthdetails.portal_user,
                "task_id": task.item.id,
                "api_key": globals.API_KEY,
            };
            console.log("data", data)
            API.getCommentData(data, cb, header);
        } else {
            // getEndPoint()
        }
    }
    const addCommentData = async () => {
        setloading(true)
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    console.log({ res })
                    toggleModal(false)
                    setloading(false)

                    Alert.alert(
                        'Success',
                        'Message Added Successfully ',

                    );
                },
                error: (err) => {
                    Alert.alert("Error", err.message)
                    toggleModal(false)
                    setloading(false)
                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            let data = {
                // "user_id": "881565",
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "task_comment": message,
                "task_id": task.item.id,
                "task_type": task.item.task_type,
                "api_key": globals.API_KEY,

            };
            console.log("data", data)
            API.addCommentData(data, cb, header);
        } else {
            // getEndPoint()
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

    const saveButtHandler = async () => {
        let userAuthdetails = await helpers.userAuthdetails();
        const baseUrl = await AsyncStorage.getItem("baseUrl");
        if (baseUrl && baseUrl !== undefined) {
            let cb = {
                success: async (res) => {
                    console.log({ res })
                    setloading(false)
                    setTimeout(() => {
                        Alert.alert('Success', 'Save Successfully ',
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        // props.navigation.navigate('Tasks')
                                    }
                                },
                            ]
                        );
                    }, 100);
                },
                error: (err) => {
                    setloading(false)
                    setTimeout(() => {
                        Alert.alert("Error", err.message)
                    }, 200);
                },
                complete: () => { },
            };
            let header = helpers.buildHeader();
            console.log("task_id", task.item.id, task.item.task_type)
            setloading(true)
            let data = {
                "user_id": userAuthdetails.user_id,
                "token": userAuthdetails.token,
                "task_id": task.item.id,
                "task_type": task.item.task_type,
                "task_evaluation": starCount,
                "api_key": globals.API_KEY,
            };
            console.log("data", data)
            API.saveEvalutionData(data, cb, header);
        } else {

        }
    }

    const toggleModal = (visible) => {
        setmodalVisible(visible);
    }

    const cancleButtonHandler = () => {
        console.log("cancle")
    }

    const saveButtonHandler = () => {
        console.log("save")
        saveButtHandler()

    }
    const onStarRatingPress = (rating) => {
        console.log(rating, "rate")
        setstarCount(rating)
        // this.setState({
        //     starCount: rating
        // });
    }
    const commentRender = (item) => {
        console.log(item, "1234")
        const date = moment(item.item.timestamp).format('YYYY-MM-DD')
        const time = moment(item.item.timestamp).format("HH:mm")
        console.log('date', time)
        return (
            <View style={{ paddingHorizontal: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}> {item.item.author} </Text >
                    <View style={{ flexDirection: 'row', display: 'flex', }}>
                        <Text style={{ fontSize: 20 }}> {date}</Text >
                        <FastImage
                            style={{ height: 20, width: 20, paddingLeft: 1, marginTop: 5, marginLeft: 5 }}
                            source={images.clock}
                            resizeMode={"contain"}
                        />
                        <Text style={{ fontSize: 20 }}> {time}</Text >
                    </View>

                </View>
                <Text style={{ fontSize: 20 }}> {item.item.task_comment}  </Text >
                <View style={{ marginTop: 10, height: 1.5, backgroundColor: colors.primaryColor }} />

            </View>)

    }
    const _keyExtractor = (item, index) => "tasks" + index.toString();



    return (
        <View style={[mainStyle.rootView, styles.container]}>
            <Loader
                loading={loading} />
            <ScrollView style={{ flex: 1 }}>
                <_Header header={helpers.getLocale(localize, "task", "task")}
                    rightIcon={images.menu} rightcb
                    onPress={() => props.navigation.navigate('ChangePassord')}
                    onPress_signout={() => signout()}


                />
                <View style={{ marginTop: 20, height: 1.5, backgroundColor: colors.primaryColor }} />
                <View style={{ paddingTop: 10 }}>
                    <InfoCart localize={localize} tasks={task} />

                    {/* <InfoCart localize={localize} /> */}
                </View>
                <View style={{ marginTop: 10, }}>
                    <View style={{}}>
                        <View style={{ ...sty.fRow, paddingLeft: 10, }}>
                            <TouchableOpacity onPress={() => setdocExapnd(!docExpand)}>
                                <FastImage
                                    style={{ height: 20, width: 20, paddingLeft: 0, marginTop: 7 }}
                                    source={images.downArrow}
                                    resizeMode={"contain"}
                                />
                            </TouchableOpacity>
                            <Text allowFontScaling={false} style={[{ fontSize: 25, paddingLeft: 10, textAlign: "center", fontWeight: "500" }]}>{helpers.getLocale(localize, "task", "documents")}</Text>
                        </View>
                        <View style={{ marginTop: 1, height: 1.5, backgroundColor: colors.primaryColor }} />
                        {true ? null : <View style={{ marginTop: 10, height: 1.5, backgroundColor: colors.primaryColor }} />}
                    </View>
                    {/* {docExpand && */}

                    {Document ?
                        <View style={{ paddingLeft: 10 }}>
                            <FlatList
                                data={DocumentCount}
                                // data={[docCount]}
                                renderItem={({ item, index }) =>
                                    <Text style={{ fontSize: 20 }}>Doc{index + 1}</Text>
                                }
                                keyExtractor={_keyExtractor}
                                removeClippedSubviews={Platform.OS == "android" ? true : false}

                            />
                        </View> : null
                        //     <Text style={{ fontSize: 20, textAlign: 'center' }}> Document List is Empty
                        //         </Text>
                    }
                    {/* } */}
                </View>

                <View style={{ marginTop: 20 }}>
                    <View style={{}}>
                        <View style={{ ...sty.fRow, paddingLeft: 10 }}>
                            <TouchableOpacity onPress={() =>
                                setmsgExapnd(!msgExpand)
                                // {()=>getCommentData()}
                                // getCommentData()
                            }>
                                <FastImage
                                    style={{ height: 20, width: 20, paddingLeft: 0, marginTop: 7 }}
                                    source={images.downArrow}
                                    resizeMode={"contain"}
                                />
                            </TouchableOpacity>
                            <Text allowFontScaling={false} style={[{ fontSize: 25, paddingLeft: 10, textAlign: "center", fontWeight: "500", }]}>{helpers.getLocale(localize, "task", "messages")}</Text>

                        </View>
                        <View style={{ marginTop: 1, height: 1.5, backgroundColor: colors.primaryColor }} />
                        {true ? null : <View style={{ marginTop: 10, height: 1.5, backgroundColor: colors.primaryColor }} />}

                        {/* {msgExpand && */}
                        {gMLoader ? <ActivityIndicator /> :
                            <>
                                {getMessage.length == 0 ?
                                    null
                                    // <Text style={{ textAlign: 'center', fontSize: 20 }}> Message List is Empty</Text>
                                    :
                                    <View style={{}}>
                                        <FlatList
                                            // data={[" ", " ", " "]}
                                            data={getMessage}
                                            maxToRenderPerBatch={2}

                                            // extraData={this.state}
                                            renderItem={commentRender}
                                            keyExtractor={_keyExtractor}
                                            removeClippedSubviews={Platform.OS == "android" ? true : false}
                                        // maxToRenderPerBatch={3}

                                        />
                                    </View>
                                }</>
                        }
                        <View style={{ marginTop: 20, borderWidth: 2, borderColor: "#969696" }}>
                            <TouchableOpacity style={{ ...sty.fRow }} onPress={() => toggleModal(true)}>
                                <View style={{ width: "85%", ...sty.jCenter, padding: 5, paddingLeft: 40 }}>
                                    <Text allowFontScaling={false} style={{ fontSize: 29, borderWidth: 0 }}>{helpers.getLocale(localize, "task", "add_message")}</Text>
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
                    <View style={{ ...sty.fRow, ...sty.aCenter, ...sty.jCenter, paddingBottom: 10, paddingTop: 10 }}>
                        {/* <FastImage style={styles.starImgStyle} source={images.filledStar} resizeMode={"contain"} />
                        <FastImage style={styles.starImgStyle} source={images.filledStar} resizeMode={"contain"} />
                        <FastImage style={styles.starImgStyle} source={images.filledStar} resizeMode={"contain"} />
                        <FastImage style={styles.starImgStyle} source={images.emptyStar} resizeMode={"contain"} /> */}
                        {/* <FastImage style={styles.starImgStyle} source={images.emptyStar} resizeMode={"contain"} /> */}
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={starCount}
                            fullStarColor={colors.primaryColor}
                            starSize={35}
                            // emptyStar={{ borderColor: 'red', borderWidth: 1 }}
                            // {this.state.starCount}
                            selectedStar={(rating) => onStarRatingPress(rating)}
                            starStyle={{ padding: 5 }}
                        />

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
                <Modal animationType={"none"} transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => toggleModal(false)}>
                    <View style={styles.modalBackground}>
                        <View style={{
                            backgroundColor: '#FFFFFF',
                            height: 200,
                            width: "80%",
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            padding: 10
                        }} >
                            <_InputText
                                style={styles.TextInput}
                                placeholder={helpers.getLocale(localize, "task", "add_message")}
                                onChangeText={value => { setmessage(value) }
                                }
                            />
                            <View style={{ marginTop: 20, borderWidth: 2, borderColor: "#969696" }}>

                                <TouchableOpacity style={{ ...sty.fRow }} onPress={() => addCommentData()}
                                >
                                    <View style={{ width: "85%", ...sty.jCenter, padding: 5, paddingLeft: 40 }}>
                                        <Text allowFontScaling={false} style={{ fontSize: 20, borderWidth: 0 }}>{helpers.getLocale(localize, "task", "add_message")}</Text>
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
                </Modal>
            </ScrollView>
        </View >

    );
};

export default MainHoc(Task)

