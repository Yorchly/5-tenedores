import React, {useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import {ListItem} from "react-native-elements";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props) {
    const {userInfo, setReloadData, toastRef} = props;

    const [modalOpened, setModalOpened] = useState(false);
    const [children, setChildren] = useState(null);

    const menuOptions = [
        {
            title: "Cambiar nombre y apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("name-surname")
        },
        {
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "email",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("email")
        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("password")
        }

    ];

    const selectedComponent = (key) => {
        switch (key) {
            case "name-surname":
                setChildren(
                    <ChangeDisplayNameForm
                        displayName={userInfo.displayName}
                        setModalOpened={setModalOpened}
                        setReloadData={setReloadData}
                        toastRef={toastRef}
                    />);
                setModalOpened(true);
                break;
            case "email":
                setChildren(ChangeEmailForm);
                setModalOpened(true);
                break;
            case "password":
                setChildren(ChangePasswordForm);
                setModalOpened(true);
                break;
            default:
                break;

        }
    };

    return (
        <View>
            {menuOptions.map((menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight
                    }}
                    onPress={menu.onPress}
                    containerStyle={styles.menuItem}
                />
            ))}

            { children && (
                <Modal isVisible={modalOpened} setIsVisible={setModalOpened}>
                    {children}
                </Modal>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
    }
});