import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider, Button } from "react-native-elements";

// Props are the same that UserGuest (withNavigation props)
export default function Login(props) {
    const { navigation } = props;
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <Image
                source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.container}>
                <Text>Form Login...</Text>
                <RegisterComponent navigation={navigation}/>
            </View>
            <Divider style={styles.divider}/>
            <View style={styles.container}>
                <Text>Login Facebook...</Text>
            </View>
        </ScrollView>
    );
}

function RegisterComponent(props) {
    const { navigation } = props;

    return (
        <View style={styles.centeringContainer}>
            <Button 
                style={styles.registerBtn} 
                title="Registrate" 
                onPress={() => navigation.navigate("Register")}
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
});