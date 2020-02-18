import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Input, Icon, Button} from "react-native-elements";
import {withNavigation} from "react-navigation";
import {validateEmail} from "../../utils/Validations";
import Loading from "../Loading";
import * as firebase from "firebase";

function LoginForm(props) {
    const {navigation, toastRef} = props;
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visibleLoading, setVisibleLoading] = useState(false);

    const authentication = async () => {
        setVisibleLoading(true);
        if (!email || !password) {
            toastRef.current.show("Los dos campos son requeridos");
        } else {
            if (validateEmail(email)) {
                try {
                    const response = await firebase.auth().signInWithEmailAndPassword(email, password);
                    navigation.navigate("Account");
                } catch (error) {
                    toastRef.current.show("ERROR! " + error.message);
                }

            } else {
                toastRef.current.show("¡Email no valido!");
            }
        }
        setVisibleLoading(false);
    };

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder={"Correo electrónico"}
                containerStyle={styles.inputForm}
                onChange={(e) => setEmail(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type={"material-community"}
                        name={"at"}
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder={"Contraseña"}
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={passwordVisible}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type={"material-community"}
                        name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                }
            />
            <Button
                title={"Iniciar sesión"}
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={authentication}
            />
            <Loading isVisible={visibleLoading} text={"Iniciando sesión..."}/>
        </View>
    );
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },

    inputForm: {
        width: "100%",
        marginTop: 15
    },

    iconRight: {
        color: "#c1c1c1"
    },

    btnContainerLogin: {
        marginTop: 20,
        width: "95%"
    },

    btnLogin: {
        backgroundColor: "#00a680"
    }
});