import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from "../screens/Restaurants";

const restaurantsScreenStacks = createStackNavigator(
    {
        Restaurants: {
            screen: RestaurantsScreen,
            navigationOptions: () => (
                {
                    title: "Restaurants"
                }
            )
        }
    }
);

export default restaurantsScreenStacks;