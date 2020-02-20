import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from "../screens/Restaurants";
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurant";

const restaurantsScreenStacks = createStackNavigator(
    {
        Restaurants: {
            screen: RestaurantsScreen,
            navigationOptions: () => (
                {
                    title: "Restaurantes"
                }
            )
        },
        AddRestaurant: {
            screen: AddRestaurantScreen,
            navigationOptions: () => ({
                title: "Añadir Restaurante"
            })
        }

    }
);

export default restaurantsScreenStacks;