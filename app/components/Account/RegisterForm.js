import React, {useState} from "react";
import {StyleSheet, View, TextInput} from "react-native";
import {Input, Icon, Button} from "react-native-elements";
import {validateEmail} from "../../utils/Validations";
import Loading from "../Loading";
import {withNavigation} from "react-navigation";
import * as firebase from "firebase";

function RegisterForm(props) {
    const {toastRef, navigation} = props;
    const [isHidePassword, setHidePassword] = useState(true);
    const [isHideRepeatPassword, setHideRepeatPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isVisibleLoading, setLoadingVisible] = useState(false);

    const register = async () => {
        setLoadingVisible(true);
        if (!email || !password || !repeatPassword) {
            toastRef.current.show("Todos los campos son obligatorios", 1000);
        } else {
            if (!validateEmail(email)) {
                toastRef.current.show("Email incorrecto", 1000);
            } else if (password !== repeatPassword) {
                toastRef.current.show("Las contraseñas no son iguales", 1000);
            } else {
                await firebase.auth().createUserWithEmailAndPassword(
                    email, password
                ).then(() => {
                    navigation.navigate("Account");
                }).catch((error) => {
                    toastRef.current.show("ERROR! " + error.message, 2500);
                });
            }
        }
        setLoadingVisible(false);
    };

    return (
        <View style={styles.formContainer} behavior="padding" enabled>
            <Input
                placeholder={"Correo electrónico"}
                containerStyle={styles.inputForm}
                onChange={e => setEmail(e.nativeEvent.text)}
                rightIcon={
                    <Icon name={"at"} type={"material-community"} iconStyle={styles.iconRight}/>
                }
            />

            <Input
                placeholder={"Contraseña"}
                password={true}
                secureTextEntry={isHidePassword}
                containerStyle={styles.inputForm}
                onChange={e => setPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        name={isHidePassword ? "eye-outline" : "eye-off-outline"}
                        type={"material-community"}
                        iconStyle={styles.iconRight}
                        onPress={() => setHidePassword(!isHidePassword)}
                    />
                }
            />

            <Input
                placeholder={"Repita Contraseña"}
                password={true}
                secureTextEntry={isHideRepeatPassword}
                containerStyle={styles.inputForm}
                onChange={e => setRepeatPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        name={isHideRepeatPassword ? "eye-outline" : "eye-off-outline"}
                        type={"material-community"}
                        iconStyle={styles.iconRight}
                        onPress={() => setHideRepeatPassword(!isHideRepeatPassword)}
                    />
                }
            />

            <Button
                title={"Unirse"}
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={register}
            />
            <Loading text={"Creando cuenta"} isVisible={isVisibleLoading}/>
        </View>
    )
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create(
    {
        formContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
        },

        inputForm: {
            width: "100%",
            marginTop: 20
        },

        iconRight: {
            color: "#c1c1c1"
        },

        btnContainerRegister: {
            marginTop: 20,
            width: "95%"
        },

        btnRegister: {
            backgroundColor: "#00a680"
        }
    }
);
