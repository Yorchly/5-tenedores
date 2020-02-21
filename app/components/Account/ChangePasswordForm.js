import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {Button} from "react-native-elements"
import {modalFormStyles} from "../../constants/Common";
import FormsInputs from "../../constants/FormsInputs";
import {Icon, Input} from "react-native-elements";
import * as firebase from "firebase";

export default function ChangePasswordForm(props) {
    const {setModalOpened, setReloadData, toastRef} = props;
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [newPasswordVisible, setNewPasswordVisible] = useState(true);
    const [repeatNewPasswordVisible, setRepeatNewPasswordVisible] = useState(true);
    const [errorPassword, setErrorPassword] = useState(null);
    const [errorNewPassword, setErrorNewPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    function changePassword() {
        setErrorNewPassword(null);
        setErrorPassword(null);
        if(!password || !newPassword || !repeatNewPassword) {
            setErrorPassword("*Campo requerido");
            setErrorNewPassword("*Campo requerido");
        }
        else if(newPassword !== repeatNewPassword)
            setErrorNewPassword("Las contraseñas no coinciden");
        else{
            setIsLoading(true);
            const credentials = firebase.auth.EmailAuthProvider.credential(
              firebase.auth().currentUser.email, password
            );

            firebase.auth().currentUser.reauthenticateWithCredential(credentials).then(() => {
                firebase.auth().currentUser.updatePassword(newPassword).then(() => {
                    setIsLoading(false);
                    setReloadData(true);
                    toastRef.current.show("Contraseña actualizada correctamente");
                    setModalOpened(false);
                }).catch(error => {
                    setIsLoading(false);
                    setErrorNewPassword(""+error);
                });
            }).catch(error => {
                setIsLoading(false);
                setErrorPassword(""+error);
            });
        }
    }

    return (
        <View style={modalFormStyles.view}>
            <Input
                label={"Contraseña"}
                placeholder={"Antigua contraseña"}
                containerStyle={styles.input}
                onChange={e => setPassword(e.nativeEvent.text)}
                password={true}
                secureTextEntry={passwordVisible}
                rightIcon={
                    <Icon
                        name={passwordVisible ? FormsInputs.passwordNotVisibleIconName : FormsInputs.passwordVisibleIconName}
                        type={FormsInputs.typeOfIcon}
                        color={FormsInputs.iconColor}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    />

                }
                errorMessage={errorPassword}
            />
            <Input
                label={"Nueva contraseña"}
                placeholder={"Nueva contraseña"}
                containerStyle={styles.input}
                onChange={e => setNewPassword(e.nativeEvent.text)}
                password={true}
                secureTextEntry={newPasswordVisible}
                rightIcon={
                    <Icon
                        name={newPasswordVisible ? FormsInputs.passwordNotVisibleIconName : FormsInputs.passwordVisibleIconName}
                        type={FormsInputs.typeOfIcon}
                        color={FormsInputs.iconColor}
                        onPress={() => setNewPasswordVisible(!newPasswordVisible)}
                    />
                }
                errorMessage={errorNewPassword}
            />

            <Input
                label={"Nueva contraseña (otra vez)"}
                placeholder={"Repita nueva contraseña"}
                containerStyle={styles.input}
                onChange={e => setRepeatNewPassword(e.nativeEvent.text)}
                password={true}
                secureTextEntry={repeatNewPasswordVisible}
                rightIcon={
                    <Icon
                        name={repeatNewPasswordVisible ? FormsInputs.passwordNotVisibleIconName : FormsInputs.passwordVisibleIconName}
                        type={FormsInputs.typeOfIcon}
                        color={FormsInputs.iconColor}
                        onPress={() => setRepeatNewPasswordVisible(!repeatNewPasswordVisible)}
                    />
                }
                errorMessage={errorNewPassword}
            />
            <Button
                title={"Cambiar contraseña"}
                buttonStyle={modalFormStyles.btn}
                containerStyle={modalFormStyles.btnContainer}
                onPress={changePassword}
                loading={isLoading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
   input: {
       ...modalFormStyles.input,
       marginTop: 10
   }
});