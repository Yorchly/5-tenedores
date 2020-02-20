import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ActionButton from "react-native-action-button";
import Common, {commonStyles} from "@constants/Common";
import * as firebase from "firebase";

export default function Restaurants(props) {
    const {navigation} = props;
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        });
    }, []);
    
    return (
        // flex = 1 is needed when you use ActionButton component
        <View style={commonStyles.view}>
            <Text>You are in restaurants page.</Text>
            {user && <AddRestaurantButton navigation={navigation}/>}
        </View>
    )
}

const AddRestaurantButton = (props) => {
    const {navigation} = props;

    return (
        <ActionButton
            buttonColor={Common.corporateColor}
            onPress={() => navigation.navigate("AddRestaurant")}
        />
    );
};