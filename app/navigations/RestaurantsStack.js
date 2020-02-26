import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from "../screens/Restaurants";
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurant";
import RestaurantDetailScreen from "../screens/Restaurants/RestaurantDetail";

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
        },
        DetailRestaurant: {
            screen: RestaurantDetailScreen,
            navigationOptions: () => ({
                title: "Detalle de Restaurante"
            })
        }

    }
);

export default restaurantsScreenStacks;