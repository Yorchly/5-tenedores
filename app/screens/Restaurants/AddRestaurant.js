import React, {useRef, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {Tooltip, Icon} from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "@components/Loading";
import AddRestaurantForm from "@components/Restaurants/AddRestaurantForm";
import Common, {commonStyles} from "@constants/Common";

export default function AddRestaurant(props) {
    const {navigation} = props;
    const toastRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Añadir imagen</Text>
                <Tooltip
                    height={250}
                    popover={
                        <Text style={styles.tooltipText}>
                            Para añadir imagen, haga click sobre el recuadro con el icono de la cámara que aparece
                            debajo.
                            {"\n"}
                            {"\n"}
                            Para eliminar imagen, haga click sobre la imagen que desea eliminar.
                            {"\n"}
                            {"\n"}
                            Puede subir como máximo 5 imágenes.
                        </Text>
                    }>
                    <Icon
                        type={"material-community"}
                        name={"information-outline"}
                        iconStyle={styles.titleIcon}
                    />
                </Tooltip>
            </View>
            <AddRestaurantForm navigation={navigation} toastRef={toastRef} setIsLoading={setIsLoading}/>
            <Toast ref={toastRef} position={"center"} opacity={0.8}/>
            <Loading isVisible={isLoading} text={"Añadiendo restaurante"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 20,
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
