import React, {useState, useEffect} from "react";
import {View, ScrollView, Alert, StyleSheet, Text} from "react-native";
import {Icon, Avatar, Image, Input, Button, Tooltip} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
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
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationRestaurant, setLocationRestaurant] = useState("");

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
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
                toastRef={toastRef}
            />
            <Map
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}
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
    const {
        setRestaurantName,
        setRestaurantLocation,
        setRestaurantDescription,
        setIsVisibleMap,
        locationRestaurant,
        toastRef
    } = props;
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
                rightIcon={BuildIcon(
                    "map-marker",
                    Common.skipArgument,
                    locationRestaurant ? Common.corporateColor : Common.greyColor,
                    async () => {
                        let resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
                        const statusPermissions = resultPermissions.permissions.location.status;
                        if(statusPermissions !== "granted")
                            toastRef.current.show("Permisos de localización denegados. Activalos desde ajustes para utilizar" +
                                " la geolocalización", 3500);
                        else
                            setIsVisibleMap(true)
                    }
                )}
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

/**
 *
 * @param props
 * @constructor
 */
const Map = (props) => {
    const {isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef} = props;
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let resultPermissions = await Permissions.getAsync(Permissions.LOCATION);
            const statusPermissions = resultPermissions.permissions.location.status;

            if(statusPermissions === "granted") {
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                });
            }
        })();
    }, []);

    return (
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView
                        style={styles.mapStyles}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={region => setLocation(region)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            dragable
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                    <Button
                        title={"Guardar ubicación"}
                        onPress={() => {
                            setLocationRestaurant(location);
                            setIsVisibleMap(false);
                            toastRef.current.show("Localización guardada correctamente");
                        }}
                        containerStyle={styles.saveButtonContainerStyle}
                        buttonStyle={styles.saveButtonStyle}
                    />
                    <Button
                        title={"Cancelar"}
                        onPress={() => setIsVisibleMap(false)}
                        containerStyle={styles.cancelButtonContainerStyle}
                        buttonStyle={styles.cancelButtonStyle}
                    />
                </View>
            </View>
        </Modal>
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
    },

    mapStyles: {
        width: "100%",
        height: 250
    },

    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },

    saveButtonContainerStyle: {
        paddingRight: 10,
        width: "50%"
    },

    saveButtonStyle: {
        backgroundColor: Common.corporateColor
    },

    cancelButtonContainerStyle: {
        paddingLeft: 5,
        width: "50%"
    },

    cancelButtonStyle: {
        backgroundColor: "#a60d0d"
    }
});