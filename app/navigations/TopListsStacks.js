import { createStackNavigator } from "react-navigation-stack";
import TopRestaurantsScreens from "../screens/TopRestaurants";

const topListScreenStacks = createStackNavigator({
        TopRestaurants: {
            screen: TopRestaurantsScreens,
            navigationOptions: () => ({
                title: "Top Restaurants"
            })
        }
    }
);

export default topListScreenStacks;