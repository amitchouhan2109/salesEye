import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
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
                <View style={{ flex: 1, borderWidth: 1, ...sty.aEnd }}>
                    <TouchableOpacity style={{}} onPress={() => { props.rightcb ? props.rightcb() : setmenu(!menu) }}>

                        <View>
                            <Menu >
                                <MenuTrigger text='Select option' customStyles={{ color: 'white' }} />
                                <MenuOptions customStyles={{}}>
                                    <MenuOption text='Context Menu'
                                        onSelect={() => this.setState({ renderer: ContextMenu })} />
                                    <MenuOption text='Slide-in Menu'
                                        onSelect={() => this.setState({ renderer: SlideInMenu })} />
                                    <MenuOption text='Three (custom)' customStyles={{}}
                                        onSelect={() => alert('Selected custom styled option')} />
                                    <MenuOption disabled={true}>
                                        <Text style={{ color: '#ccc' }}>Four (disabled)</Text>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                            {props.rightIcon ?
                                <FastImage
                                    style={{ height: 20, width: 20, paddingLeft: 0 }}
                                    source={props.rightIcon}
                                    resizeMode={"contain"}
                                />
                                : null
                            }
                        </View>

                    </TouchableOpacity>
                    {/* <CustomMenuIcon
                        //Menu Text
                        menutext="Menu"
                        //Menu View Style
                        menustyle={{
                            marginRight: 16,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                        //Menu Text Style
                        textStyle={{
                            color: 'white',
                        }}
                        //Click functions for the menu items
                        option1Click={() => {
                            navigation.navigate('FirstPage');
                        }}
                        option2Click={() => { }}
                        option3Click={() => { }}
                        option4Click={() => {
                            alert('Option 4');
                        }}
                    /> */}
                </View>
            </View >
        </View >
    )

}

export default _Header;