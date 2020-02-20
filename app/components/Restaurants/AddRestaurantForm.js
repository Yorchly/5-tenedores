import React, {useState, useEffect} from "react";
import {View, ScrollView, Alert, Dimensions, StyleSheet} from "react-native";
import {Icon, Avatar, Image, Input, Button} from "react-native-elements";
import Common from "@constants/Common";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function AddRestaurantForm(props) {
    const {navigation, toastRef, setIsLoading} = props;
    const [imagesSelected, setImagesSelected] = useState([]);
    const [reloadImages, setReloadImages] = useState(false);

    useEffect(() => {
        setImagesSelected(imagesSelected);
        setReloadImages(false);
    }, [reloadImages]);

    return (
        <ScrollView>
            <UploadImage
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
                toastRef={toastRef}
                setReloadImages={setReloadImages}
            />
        </ScrollView>
    )
}

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
     * Remove a image.
     * @param imageURI
     */
    const removeImageSelected = (imageURI) => {
        Alert.alert(
            "Eliminar imagen",
            "¿Estás seguro de que quieres eliminar la imágen?",
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
    }
});