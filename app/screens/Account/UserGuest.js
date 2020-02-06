import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements";

export default function UserGuest() {
    return (
        <ScrollView style={styles.viewBody} centerContent={true}>
            <Image source={require("@images/user-guest.jpg")}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30
    }
})