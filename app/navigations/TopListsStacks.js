import { createStackNavigator } from "react-navigation-stack";
import TopRestaurantsScreens from "../screens/TopRestaurants";

const TopListScreenStacks = createStackNavigator({
        TopRestaurants: {
            screen: TopRestaurantsScreens,
            navigationOptions: () => ({
                title: "Top Restaurants"
            })
        }
    }
);

export default TopListScreenStacks;