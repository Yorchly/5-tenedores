import React, {useState, useEffect} from "react";
import {View, ScrollView, Alert, StyleSheet, Text} from "react-native";
import {Icon, Avatar, Image, Input, Button, Tooltip} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import MapView from "react-native-maps";

import Common, {commonStyles} from "@constants/Common";
import {BuildIcon} from "@constants/FormsInputs";
import Modal from "../Modal";


/**
 * Main function of the AddRestaurantForm component
 * @param props
 * @returns {*}
 * @constructor
 */
export default function AddRestaurantForm(props) {
    const {navigation, toastRef, setIsLoading} = props;
    const [imagesSelected, setImagesSelected] = useState([]);
    const [reloadImages, setReloadImages] = useState(false);
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantLocation, setRestaurantLocation] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");

    useEffect(() => {
        setImagesSelected(imagesSelected);
        setReloadImages(false);
    }, [reloadImages]);

    return (
        <ScrollView>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Añadiendo imagen</Text>
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
            <MainRestaurantImage image={imagesSelected[0]}/>
            <UploadImage
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
                toastRef={toastRef}
                setReloadImages={setReloadImages}
            />

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Datos del restaurante</Text>
            </View>
            <AddForm
                setRestaurantName={setRestaurantName}
                setRestaurantLocation={setRestaurantLocation}
                setRestaurantDescription={setRestaurantDescription}
            />

        </ScrollView>
    )
}

/**
 *
 * @returns {*}
 * @constructor
 */
const MainRestaurantImage = (props) => {
    const {image} = props;
    return (
        <View style={styles.viewPhoto}>
            {image ? (
                <Image
                    source={{uri: image}}
                    style={{width: Common.deviceWidth, height: 200}}
                />
            ) : (
                <Image
                    source={require("../../../assets/img/no-image.png")}
                    style={{width: Common.deviceWidth, height: 200}}
                />
            )}
        </View>
    );
};

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const UploadImage = (props) => {
    const {imagesSelected, setImagesSelected, toastRef, setReloadImages} = props;

    /**
     * Select a photo from gallery and add it to array imagesSelected
     * @returns {Promise<void>}
     */
    const imageSelect = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (resultPermission.status === "granted") {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (result.cancelled)
                toastRef.current.show("No has seleccionado ninguna imagen", 3000);
            else
                setImagesSelected([...imagesSelected, result.uri])
        } else
            toastRef.current.show("Permisos de acceso a la galería no aceptados.", 3000);
    };

    /**
     * Remove and update the images shown.
     * @param imageURI
     */
    const removeImageSelected = (imageURI) => {
        Alert.alert(
            "Eliminar imagen",
            "¿Estás seguro de que quieres eliminar la imagen?",
            [
                {
                    text: "Atrás",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        imagesSelected.splice(
                            imagesSelected.indexOf(imageURI), 1
                        );
                        setReloadImages(true);
                        toastRef.current.show("Imagen eliminada");
                    }
                }
            ],
            {cancelable: true}
        )
    };

    return (
        <View style={styles.viewImages}>
            {imagesSelected.length < 5 && (
                <Icon
                    type={"material-community"}
                    name={"camera"}
                    color={Common.greyColor}
                    containerStyle={styles.containerIcon}
                    onPress={() => imageSelect()}
                />
            )}

            {imagesSelected.map((imageURI, index) => (
                <Avatar
                    key={index}
                    onPress={() => removeImageSelected(imageURI)}
                    style={styles.miniatureStyle}
                    source={{uri: imageURI}}
                />
            ))}
        </View>
    )
};

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const AddForm = (props) => {
    const {setRestaurantName, setRestaurantLocation, setRestaurantDescription} = props;
    return(
        <View style={styles.viewForm}>
            <Input
                label={"Nombre del restaurante"}
                placeholder={"Nombre"}
                containerStyle={styles.input}
                onChange={e => setRestaurantName(e.nativeEvent.text)}
            />
            <Input
                label={"Dirección del restaurante"}
                placeholder={"Dirección"}
                containerStyle={styles.input}
                onChange={e => setRestaurantLocation(e.nativeEvent.text)}
                rightIcon={BuildIcon("map-marker", Common.skipArgument, Common.skipArgument, ()=>console.log("mapa"))}
            />

            <Input
                label={"Descripción del restaurante"}
                placeholder={"Descripción"}
                containerStyle={styles.input}
                multiline
                inputContainerStyle={styles.textArea}
                onChange={e => setRestaurantDescription(e.nativeEvent.text)}
            />
        </View>
    )
};


const styles = StyleSheet.create({
    viewImages: {
        flexWrap: "wrap",
        flexDirection: "row",
        margin: 20
    },

    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        marginBottom: 10,
        height: 70,
        width: 70,
        backgroundColor: Common.whiteIconColor
    },

    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10,
        marginBottom: 10
    },

    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },

    viewForm: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15
    },

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
    },

    textArea: {
        height: 100,
        width: "100%"
    },

    input: {
        marginBottom: 15
    }

});