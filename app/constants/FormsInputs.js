const type = "material-community";
const color = "#c2c2c2";

export default {
    typeOfIcon: type,
    emailIconName: "at",
    passwordNotVisibleIconName: "eye-outline",
    passwordVisibleIconName: "eye-off-outline",
    userIcon: "account-circle-outline",
    iconColor: color
};

export const BuildIcon = (iconName, iconType=type, iconColor=color, onPress=()=>{}) => {
    return {
        name: iconName,
        type: iconType,
        color: iconColor,
        onPress: onPress
    };
};