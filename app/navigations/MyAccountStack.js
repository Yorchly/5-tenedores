import { createStackNavigator } from "react-navigation-stack";
import MyAccountScreen from "../screens/MyAccount";

const myAccountScreenStack = createStackNavigator(
    {
        Account: {
            screen: MyAccountScreen,
            navigationOptions: {
                title: "My Account"
            }
        }
    }
);

export default myAccountScreenStack;