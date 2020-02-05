import React from "react";
import { Icon, Text } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import RestaurantsScreenStacks from "./RestaurantsStack";
import TopListScreenStacks from "./TopListsStacks";

const navigationStacks = createBottomTabNavigator(
    {
        Restaurants: {
            screen: RestaurantsScreenStacks,
            navigationOptions: () => ({
                    tabBarLabel: "Restaurants",
                    tabBarIcon: ({ tintColor }) => (
                        <Icon type="material-community" name="compass-outline" size={22} color={tintColor}/>
                    )
                }
            )
        },
        
        TopList: {
            screen: TopListScreenStacks,
            navigationOptions: () => ({
                tabBarLabel: "Ranking",
                tabBarIcon: ({tintColor}) => (
                    <Icon type="material-community" name="star-outline" size={22} color={tintColor}/>
                )
            })
        }
    }
);

export default createAppContainer(navigationStacks);