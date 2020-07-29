import { StyleSheet } from "react-native";
import {
    colors,
    fonts,
    sty,
} from "../../../Theme";

export default styles = StyleSheet.create({
    btnWrap: {
        borderTopWidth: 1.5,
        borderBottomWidth: 1.5,
        ...sty.aCenter,
        ...sty.jCenter,
        borderBottomColor: colors.buttonBorder,
        borderTopColor: colors.buttonBorder,
        paddingVertical: 7.5,
        ...sty.fRow
    },
    inputText: {
        fontSize: 20,
    },
    line: {
        width: 2,
        height: "100%",
        backgroundColor: colors.buttonBorder
    },
    btnTextStyle: {
        fontSize: 29,
        color: "#1C7DED"
    },
    pairButtonStyle: {
        width: "50%",
        ...sty.aCenter
    },
    pairBtnTextStyle: {
        fontSize: 29,
        color: "#1C7DED",
        height: 29
    }



});
