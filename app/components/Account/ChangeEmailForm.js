import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {Input, Button, Icon, Text} from "react-native-elements";
import * as firebase from "firebase";
import {validateEmail} from "../../utils/Validations";
import FormsInputs, {BuildIcon} from "../../constants/FormsInputs";
import {modalFormStyles} from "../../constants/Common";

export default function ChangeEmailForm(props) {
    const {email, setModalOpened, setReloadData, toastRef} = props;
    const [newEmail, setNewEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(true);

    const changeEmail = () => {
        setErrorEmail(null);
        setErrorPassword(null);
        if(!newEmail)
            setErrorEmail("No se ha modificado el email");
        else if(!validateEmail(newEmail))
            setErrorEmail("El email no es valido");
        else if(!password)
            setErrorPassword("Necesitas volver a introducir la contraseña para modificar el correo");
        else {
            setIsLoading(true);
            const credential = firebase.auth.EmailAuthProvider.credential(
              firebase.auth().currentUser.email, password
            );

            firebase.auth().currentUser.reauthenticateWithCredential(credential).then(() => {
                firebase.auth().currentUser.updateEmail(newEmail).then(() => {
                    setIsLoading(false);
                    setReloadData(true);
                    toastRef.current.show("Email actualizado correctamente");
                    setModalOpened(false);
                }).catch(error => {
                    setErrorEmail(error.message);
                    setIsLoading(false);
                });
            }).catch(error => {
                setErrorPassword(error.message);
                setIsLoading(false);
            });
        }
    };

    return (
        <View style={modalFormStyles.view}>
            <Input
                placeholder={"Email"}
                label={"Correo electrónico"}
                containerStyle={styles.input}
                defaultValue={email}
                onChange={e => setNewEmail(e.nativeEvent.text)}
                rightIcon={BuildIcon(
                    FormsInputs.emailIconName,
                )}
                errorMessage={errorEmail}
            />

            <Input
                placeholder={"Contraseña"}
                label={"Contraseña"}
                containerStyle={styles.input}
                password={true}
                secureTextEntry={passwordVisible}
                onChange={e => setPassword(e.nativeEvent.text)}
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

            <Text style={modalFormStyles.textModal}>
              Necesitas introducir la contraseña de nuevo para cambiar el correo
            </Text>

            <Button
                title={"Cambiar email"}
                buttonStyle={modalFormStyles.btn}
                containerStyle={modalFormStyles.btnContainer}
                onPress={changeEmail}
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
