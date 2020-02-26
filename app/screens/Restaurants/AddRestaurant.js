import React, {useRef, useState} from "react";
import {View} from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "@components/Loading";
import AddRestaurantForm from "@components/Restaurants/AddRestaurantForm";

export default function AddRestaurant(props) {
    const {navigation} = props;
    const {setReloadRestaurantList} = props.navigation.state.params;
    const toastRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <View>
            <AddRestaurantForm
                navigation={navigation}
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                setReloadRestaurantList={setReloadRestaurantList}
            />
            <Toast ref={toastRef} position={"center"} opacity={0.8}/>
            <Loading isVisible={isLoading} text={"Añadiendo restaurante..."}/>
        </View>
    )
}
