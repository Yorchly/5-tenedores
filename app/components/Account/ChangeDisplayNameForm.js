import React, {useState} from "react";
import {View,} from "react-native";
import {Input, Button} from "react-native-elements";
import * as firebase from "firebase";
import {modalFormStyles} from "../../constants/Common";
import FormsInputs, {BuildIcon} from "../../constants/FormsInputs";

export default function ChangeDisplayNameForm(props) {

    const {displayName, setModalOpened, setReloadData, toastRef} = props;
    const [newDisplayName, setNewDisplayName] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const updateDisplayName = () => {
        setError(null);
        if(!newDisplayName)
            setError("El nombre de usuario no ha cambiado");
        else {
            setIsLoading(true);
            const update = {
                displayName: newDisplayName
            };
            firebase.auth().currentUser.updateProfile(update).then(() => {
                setIsLoading(false);
                setReloadData(true);
                toastRef.current.show("Nombre actualizado correctamente", 1500);
                setModalOpened(false);
            }).catch((error) => {
                setError("Error: "+error);
                setIsLoading(false);
            });
        }
    };

    return (
        <View style={modalFormStyles.view}>
            <Input
                label={"Nombre y apellidos"}
                placeholder={"Nombre y apellidos"}
                containerStyle={modalFormStyles.input}
                defaultValue={displayName && displayName}
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                rightIcon={BuildIcon(
                    FormsInputs.userIcon
                )}
                errorMessage={error}
            />
            <Button
                title={"Cambiar nombre"}
                containerStyle={modalFormStyles.btnContainer}
                buttonStyle={modalFormStyles.btn}
                onPress={updateDisplayName}
                loading={isLoading}
            />
        </View>
    )
}