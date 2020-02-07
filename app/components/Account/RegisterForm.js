import React from "react";
import {StyleSheet, View} from "react-native";
import {Input, Icon, Button} from "react-native-elements";

export default function RegisterForm() {

    function register() {
        console.log("Usuario registrado")
    }

    return (
        <View style={styles.formContainer} behavior="padding" enabled>
            <Input
                placeholder={"Correo electrónico"}
                containerStyle={styles.inputForm}
                onChange={() => console.log("Email actualizado")}
                rightIcon={
                    <Icon name={"at"} type={"material-community"} iconStyle={styles.iconRight}/>
                }
            />

            <Input
                placeholder={"Contraseña"}
                password={true}
                secureTextEntry={true}
                containerStyle={styles.inputForm}
                onChange={() => console.log("Escribiendo en contraseña")}
                rightIcon={
                    <Icon name={"eye-outline"} type={"material-community"} iconStyle={styles.iconRight}/>
                }
            />

            <Input
                placeholder={"Repita Contraseña"}
                password={true}
                secureTextEntry={true}
                containerStyle={styles.inputForm}
                onChange={() => console.log("Escribiendo en repetir contraseña")}
                rightIcon={
                    <Icon name={"eye-outline"} type={"material-community"} iconStyle={styles.iconRight}/>
                }
            />

            <Button
                title={"Unirse"}
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={register}
            />
        </View>
    )
}

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
