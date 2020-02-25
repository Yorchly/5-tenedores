import React, {useRef, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {Tooltip, Icon} from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "@components/Loading";
import AddRestaurantForm from "@components/Restaurants/AddRestaurantForm";
import Common, {commonStyles} from "@constants/Common";

export default function AddRestaurant(props) {
    const {navigation} = props;
    const {setReloadRestaurantList} = props.navigation.state.params;
    const toastRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <View>
            <AddRestaurantForm
                navigation={navigation}
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                setReloadRestaurantList={setReloadRestaurantList}
            />
            <Toast ref={toastRef} position={"center"} opacity={0.8}/>
            <Loading isVisible={isLoading} text={"Añadiendo restaurante..."}/>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 20,
        alignItems: "center"
    },

    title: {
        ...commonStyles.title,
        marginRight: 5
    },

    tooltipText: {
        color: "#fff2f9"
    },

    titleIcon: {
        color: Common.greyColor
    }
});
