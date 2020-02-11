import React, {useRef} from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider, Button } from "react-native-elements";
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast";


// Props are the same that UserGuest (withNavigation props)
export default function Login(props) {
    const { navigation } = props;
    const toastRef = useRef();
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <Image
                source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.container}>
                <LoginForm toastRef={toastRef}/>
                <RegisterComponent navigation={navigation}/>
            </View>
            <Divider style={styles.divider}/>
            <View style={styles.container}>
                <Text>Login Facebook...</Text>
            </View>
            <Toast
                ref={toastRef}
                position={"top"}
                opacity={0.8}
            />
        </ScrollView>
    );
}

function RegisterComponent(props) {
    const { navigation } = props;

    return (
        <View style={styles.centeringContainer}>
            <Button
                title="Registrate" 
                onPress={() => navigation.navigate("Register")}
                containerStyle={styles.btnContainerRegister}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        height: 150,
        width: "100%",
        marginTop: 20,
        marginBottom: 30
    },
    
    container: {
        marginRight: 40,
        marginLeft: 40
    },

    divider: {
        backgroundColor: "#00a680",
        margin: 20
    },

    centeringContainer: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,

    },

    btnContainerRegister: {
        marginTop: 10,
        width: "95%"
    }
});