import React, {useEffect, useState, useRef} from "react";
import {View} from "react-native";
import {Button} from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Loading from "../../components/Loading";
import Toast from "react-native-easy-toast";

export default function UserLogged() {
    const [userInfo, setUserInfo] = useState({});
    const [reloadData, setReloadData] = useState(false);
    const [visibleLoading, setVisibleLoading] = useState(false);
    const toastRef = useRef();

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);
        })();
        setReloadData(false);
    }, [reloadData]);

    return (
        <View>
            <InfoUser
                userInfo={userInfo}
                setReloadData={setReloadData}
                setVisibleLoading={setVisibleLoading}
                toastRef = {toastRef}
            />
            <Button
                title={"Cerrar sesión"}
                onPress={() => firebase.auth().signOut()}
            />
            <Loading isVisible={visibleLoading} text={"Actualizando imagen..."}/>
            <Toast
                ref={toastRef}
                position={"center"}
                opacity={0.8}
            />
        </View>
    );
}