import React, {useRef} from "react";
import {StyleSheet, View, Image, Text, ScrollView} from "react-native";
import Toast from "react-native-easy-toast";
import RegisterForm from "../../components/Account/RegisterForm";

export default function Register() {
    const toastRef = useRef();

    return (
        <ScrollView>
            <Image 
                source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.viewForm}>
                <RegisterForm toastRef={toastRef}/>
            </View>
            <Toast
                ref={toastRef}
                position={"top"}
                opacity={0.8}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create(
    {
        logo: {
            width: "100%",
            height: 150,
            marginTop: 20,
        },

        viewForm: {
            marginRight: 40,
            marginLeft: 40
        },

        toast: {
            backgroundColor: "red"
        }
    }
);
