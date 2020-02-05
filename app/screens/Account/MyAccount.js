import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { View, Text } from "react-native";
import Loading from "../../components/Loading";

export default function MyAccount() {
    const [login, setLogin] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            !user ? setLogin(false) : setLogin(true);
        });
    }, []);

    if(login) {
        return (
            <View>
                <Text>Usuario logueado</Text>
            </View>
        )
    }
    else if(login === null){
        return (
            <Loading isVisible={false} text="Cargando..."/>
        )
    }

    return (
        <View>
            <Text>Usuario no logueado</Text>
        </View>
    )
}