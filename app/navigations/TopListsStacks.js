import { createStackNavigator } from "react-navigation-stack";
import TopRestaurantsScreens from "../screens/TopRestaurants";

const topListScreenStacks = createStackNavigator({
        TopRestaurants: {
            screen: TopRestaurantsScreens,
            navigationOptions: () => ({
                title: "Top restaurantes"
            })
        }
    }
);

export default topListScreenStacks;