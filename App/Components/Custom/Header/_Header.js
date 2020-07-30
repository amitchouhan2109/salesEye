import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Input, Item } from "native-base";
import styles from "./Styles";
import { colors, sty } from "../../../Theme"
import FastImage from 'react-native-fast-image'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuContext } from 'react-native-popup-menu';
// import CustomMenu from '../CustomMenu/CustomMenu';

const _Header = (props) => {
    const [menu, setmenu] = useState(false);

    const style = props.style || {};
    return (
        <View style={{ paddingTop: 20 }}>
            <View style={{ ...sty.fRow, }}>
                <View style={{ flex: 1, }}>
                </View>
                <View style={{ flex: 8, ...sty.aCenter, ...sty.jCenter, borderWidth: 0 }}>
                    <Text style={styles.headingText}> {props.header ? props.header : "Header"} </Text>
                </View>
                {props.rightIcon ?
                    <View style={{ flex: 1, ...sty.aEnd }}>
                        <TouchableOpacity style={{}}
                        // onPress={() => t.props.navigation.navigate('ChangePassord')}

                        // onPress={() => { props.rightcb ? props.rightcb() : setmenu(!menu) }}
                        >
                            <View>
                                <Menu >
                                    <MenuTrigger customStyles={triggerStyles} >
                                        <FastImage
                                            style={{ height: 40, width: 40, paddingLeft: 0, color: 'black' }}
                                            source={props.rightIcon}
                                            resizeMode={"contain"}
                                        />
                                    </MenuTrigger>
                                    <MenuOptions customStyles={{
                                        optionText: { fontSize: 20 },
                                        optionWrapper: { borderColor: '#1C7DED', borderWidth: 1, }
                                    }} >
                                        <MenuOption text='Change Password'
                                            onSelect={props.onPress ? () => props.onPress() : null}
                                        />
                                        <MenuOption text='Language'
                                            onSelect={() => this.setState({ renderer: SlideInMenu })
                                                // props.navigation.navigate('ChangePassord')
                                            } />
                                        <MenuOption text='Sign Out' customStyles={{}}
                                            onSelect={() => alert('Selected custom styled option')} />
                                        {/* <MenuOption disabled={true}>
                                            <Text style={{ color: '#ccc' }}>Four (disabled)</Text>
                                        </MenuOption> */}
                                    </MenuOptions>
                                </Menu>
                                {/* {props.rightIcon ?
                                    <FastImage
                                        style={{ height: 40, width: 40, paddingLeft: 0, color: 'black' }}
                                        source={props.rightIcon}
                                        resizeMode={"contain"}
                                    />
                                    : null
                                } */}
                            </View>

                        </TouchableOpacity>

                    </View> : null}
            </View >
        </View >
    )

}
const triggerStyles = {
    triggerText: {
        // color: 'pink',
    },
    triggerWrapper: {
        padding: 5,
        // backgroundColor: 'blue',
    },
    triggerTouchable: {
        // underlayColor: 'darkblue',
        // activeOpacity: 70,
    },
    TriggerTouchableComponent: TouchableHighlight,
};

export default _Header;