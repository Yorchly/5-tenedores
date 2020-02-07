import {createStackNavigator} from "react-navigation-stack";
import MyAccountScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";

const myAccountScreenStack = createStackNavigator(
    {
        Account: {
            screen: MyAccountScreen,
            navigationOptions: {
                title: "My Account"
            }
        },

        Login: {
            screen: LoginScreen,
            navigationOptions: {
                title: "Login"
            }
        },

        Register: {
            screen: RegisterScreen,
            navigationOptions: {
                title: "Register"
            }
        }

    }
);

export default myAccountScreenStack;