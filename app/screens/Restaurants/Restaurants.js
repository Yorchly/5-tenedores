import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ActionButton from "react-native-action-button";
import firebase from "firebase/app";
import "firebase/firestore";

import ListRestaurants from "./ListRestaurants";

import Common, {commonStyles} from "@constants/Common";
import {firebaseApp} from "@utils/FireBase";

const db = firebase.firestore(firebaseApp);

export default function Restaurants(props) {
    const {navigation} = props;
    const [user, setUser] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    // This state is used for infinite scrolling
    const [startRestaurants, setStartRestaurants] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    const [reloadRestaurantList, setReloadRestaurantList] = useState(false);
    // Its going to show 8 restaurants at a time
    const limitRestaurant = 8;

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        });
    }, []);

    useEffect(() => {
        setReloadRestaurantList(false);
        db.collection("restaurants")
            .get()
            .then((snap) => {
                setTotalRestaurants(snap.size);
            });

        (async () => {
            let resultRestaurants = [];

            const restaurants = db
                .collection("restaurants")
                .orderBy("createdAt", "desc")
                .limit(limitRestaurant);

            await restaurants
                .get()
                .then(response => {
                    setStartRestaurants(response.docs[response.docs.length - 1]);

                    response.forEach(doc => {
                        let restaurant = doc.data();
                        restaurant.id = doc.id;
                        resultRestaurants.push({restaurant});
                    });

                    setRestaurants(resultRestaurants);
                });
        })();

    }, [reloadRestaurantList]);

    const handleMore = async () => {
        const resultRestaurants = [];
        restaurants.length < totalRestaurants && setIsLoading(true);

        const restaurantsDb = db.collection("restaurants")
            .orderBy("createdAt", "desc")
            .startAfter(startRestaurants.data().createdAt)
            .limit(limitRestaurant);

        await restaurantsDb.get().then(response => {
            if (response.docs.length > 0)
                setStartRestaurants(response.docs[response.docs.length - 1]);
            else
                setIsLoading(false);

            response.forEach(doc => {
                let restaurant = doc.data();
                restaurant.id = doc.id;
                resultRestaurants.push({restaurant});
            });

            setRestaurants([...restaurants, ...resultRestaurants]);
        });
    };

    return (
        // flex = 1 is needed when you use ActionButton component
        <View style={commonStyles.view}>
            <ListRestaurants restaurants={restaurants} isLoading={isLoading} handleMore={handleMore}/>
            {user && <AddRestaurantButton navigation={navigation} setReloadRestaurantList={setReloadRestaurantList}/>}
        </View>
    )
}

const AddRestaurantButton = (props) => {
    const {navigation, setReloadRestaurantList} = props;

    return (
        <ActionButton
            buttonColor={Common.corporateColor}
            onPress={() => navigation.navigate("AddRestaurant", {setReloadRestaurantList: setReloadRestaurantList})}
        />
    );
};