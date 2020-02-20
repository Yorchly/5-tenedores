import {StyleSheet} from "react-native";

const corporateColor = "#00a680";
const inactiveColor = "#646464";
const greyColor = "#7a7a7a";
const whiteIconColor = "#e3e3e3";

export default{
    corporateColor: corporateColor,
    inactiveColor: inactiveColor,
    greyColor: greyColor,
    whiteIconColor: whiteIconColor,
};


export const modalFormStyles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },

    input: {
        marginBottom: 10
    },

    btnContainer: {
        marginTop: 20,
        width: "95%"
    },

    btn: {
        backgroundColor: corporateColor
    },

    textModal: {
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: "bold"
    }
});

export const commonStyles = StyleSheet.create({
    view: {
        flex: 1
    }
});
