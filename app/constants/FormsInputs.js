export default {
    typeOfIcon: "material-community",
    emailIconName: "at",
    passwordNotVisibleIconName: "eye-outline",
    passwordVisibleIconName: "eye-off-outline",
    userIcon: "account-circle-outline",
    iconColor: "#c2c2c2"
};

export const BuildIcon = (iconType, iconName, iconColor) => {
    return {
        type: iconType,
        name: iconName,
        color: iconColor
    };
};