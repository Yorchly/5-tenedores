import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import restaurantsScreenStacks from "./RestaurantsStack";
import topListScreenStacks from "./TopListsStacks";
import searchScreenStack from "./SearchStack";
import myAccountScreenStack from "./MyAccountStack";
import Common from "../constants/Common";

const navigationStacks = createBottomTabNavigator(
    {
        Restaurants: {
            screen: restaurantsScreenStacks,
            navigationOptions: () => ({
                    tabBarLabel: "Restaurante",
                    tabBarIcon: ({ tintColor }) => (
                        <Icon type="material-community" name="compass-outline" size={22} color={tintColor}/>
                    )
                }
            )
        },
        
        TopList: {
            screen: topListScreenStacks,
            navigationOptions: () => ({
                tabBarLabel: "Ranking",
                tabBarIcon: ({ tintColor }) => (
                    <Icon type="material-community" name="star-outline" size={22} color={tintColor}/>
                )
            })
        },

        Search: {
            screen: searchScreenStack,
            navigationOptions: () => (
                {
                    tabBarLabel: "Buscar",
                    tabBarIcon: ({ tintColor }) => (
                        <Icon type="material-community" name="magnify" size={22} color={tintColor} />
                    )
                }
            )
        },

        Account: {
            screen: myAccountScreenStack,
            // You can add dict to navigationOption without the arrow function.
            navigationOptions: {
                tabBarLabel: "Cuenta",
                tabBarIcon: ({ tintColor }) => (
                    <Icon type="material-community" name="account" size={22} color={tintColor} />
                )
            }
        }
    }, 

    {
        // These are optional arguments to configure the bottom navigation.
        // Initial Route showed the first time you open the app.
        initialRouteName: "Restaurants",
        // The key name in the list must be the same that key name in createBottomTabNavigator dict.
        order: ["Restaurants", "TopList", "Search", "Account"],
        tabBarOptions: {
            inactiveTintColor: Common.inactiveColor,
            activeTintColor: Common.corporateColor
        }

    }
);

export default createAppContainer(navigationStacks);