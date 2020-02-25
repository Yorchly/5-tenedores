import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";
import {Image} from "react-native-elements";
import * as firebase from "firebase";

export default function ListRestaurants(props) {
    const {restaurants, isLoading, handleMore} = props;
    return (
        <View>
            {restaurants ? (
                <FlatList
                    data={restaurants}
                    renderItem={restaurant => <Restaurant restaurant={restaurant}/>}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={handleMore}
                    onEndReachedThreshold={0}
                    ListFooterComponent={<FooterList isLoading={isLoading}/>}
                />
            ) : (
                <View style={styles.loaderRestaurants}>
                    <ActivityIndicator size={"large"}/>
                    <Text>Cargando restaurantes</Text>
                </View>
            )}
        </View>
    )
}

const Restaurant = (props) => {
    const {restaurant} = props;
    const {name, address, description, images} = restaurant.item.restaurant;
    const [imageRestaurant, setImageRestaurant] = useState(null);

    useEffect(() => {
        const image = images[0];
        firebase.storage()
            .ref(`restaurant-images/${image}`)
            .getDownloadURL()
            .then(result => {
                setImageRestaurant(result);
            });
    }, []);

    return (
        <TouchableOpacity onPress={() => console.log("Ir al restaurante")}>
            <View style={styles.viewRestaurant}>
                <View style={styles.viewRestaurantImage}>
                    <Image
                        source={{uri: imageRestaurant}}
                        resizeMode={"cover"}
                        style={styles.imageRestaurant}
                        PlaceholderContent={<ActivityIndicator color={"#fff"}/>}
                    />
                </View>
                <View>
                    <Text style={styles.restaurantName}>{name}</Text>
                    <Text style={styles.restaurantAddress}>{address}</Text>
                    <Text
                        style={styles.restaurantDescription}>{description.length < 60 ? description : description.substr(0, 60) + "..."}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const FooterList = (props) => {
    const {isLoading} = props;
    if (isLoading)
        return (
            <View style={styles.loadingRestaurants}>
                <ActivityIndicator size={"large"}/>
            </View>
        );
    else
        return (
            <View style={styles.notFoundRestaurant}>
                <Text>No quedan restaurantes por cargar</Text>
            </View>
        );
};

const styles = StyleSheet.create({
    loadingRestaurants: {
        marginTop: 20,
        alignItems: "center"
    },

    viewRestaurant: {
        flexDirection: "row",
        margin: 10
    },

    viewRestaurantImage: {
        marginRight: 15
    },

    imageRestaurant: {
        width: 80,
        height: 80
    },

    restaurantName: {
        fontWeight: "bold"
    },

    restaurantAddress: {
        paddingTop: 2,
        color: "grey"
    },

    restaurantDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300
    },

    loaderRestaurants: {
        marginTop: 10,
        marginBottom: 10
    },

    notFoundRestaurant: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    }
});