import {StyleSheet} from "react-native";

const corporateColor = "#00a680";

export default{
    corporateColor: corporateColor
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
