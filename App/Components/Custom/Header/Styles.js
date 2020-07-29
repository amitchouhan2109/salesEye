import { StyleSheet } from "react-native";
import {
    colors,
    fonts,
    sty,
} from "../../../Theme";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../Config/Libs/globals';
import { color } from "react-native-reanimated";

export default styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        ...sty.flex1,
    },
    inputText: {
        fontSize: 20,
    },
    headingText: {
        fontSize: 30,
        color: colors.text,
        fontWeight: "400",
        fontFamily: 'MyriadPro-Light'
    }


});
