import { StyleSheet } from "react-native";
import {
    colors,
    fonts,
    sty,
} from "../../../../Theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../../Config/Libs/globals';

export default styles = StyleSheet.create({

    container: {
        // backgroundColor: "#fff",
        // ...sty.flex1
        marginLeft: 15
    },
    TextInput: {
        marginTop: 45,
    },
    signUpWrapper: {
        flex: 1,
        borderWidth: 0,
        paddingBottom: 50,
        ...sty.jEnd,
        ...sty.aCenter
    },
    signUpView: {
        borderWidth: 0,
        marginTop: 20,
        width: "100%"
    },
    signUp: {
        ...sty.fRow,
        paddingTop: 0,
        paddingLeft: 0,
        borderWidth: 0,
        width: "60%",
        ...sty.aCenter,
        borderWidth: 0
    },
    signUpText: {
        fontSize: 20,
        color: colors.text,
        fontWeight: "bold"
    },


});
