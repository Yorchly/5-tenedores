import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {Input, Button, Icon} from "react-native-elements";
import * as firebase from "firebase";
import {validateEmail} from "../../utils/Validations";

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

            console.log(credential);

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
      <View style={styles.view}>
          <Input
            placeholder={"Email"}
            containerStyle={styles.input}
            defaultValue={email}
            onChange={e => setNewEmail(e.nativeEvent.text)}
            rightIcon={{
                type: "material-community",
                name: "at",
                color: "#c2c2c2"
            }}
            errorMessage={errorEmail}
          />

          <Input
              placeholder={"Contraseña"}
              containerStyle={styles.input}
              password={true}
              secureTextEntry={passwordVisible}
              onChange={e => setPassword(e.nativeEvent.text)}
              rightIcon={
                  <Icon
                      name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                      type={"material-community"}
                      color={"#c2c2c2"}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                  />
              }
              errorMessage={errorPassword}
          />

          <Button
            title={"Cambiar email"}
            buttonStyle={styles.btn}
            containerStyle={styles.btnContainer}
            onPress={changeEmail}
            loading={isLoading}
          />
      </View>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: "#00a680"
    }
});