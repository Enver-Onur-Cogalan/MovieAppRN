import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: '#aaa',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Search':
                            iconName = 'search';
                            break;
                        case 'Favorites':
                            iconName = 'favorite';
                            break;
                        case 'Profile':
                            iconName = 'person';
                            break;
                        default:
                            iconName = 'circle';
                    }

                    return <Icon name={iconName} size={24} color={focused ? colors.primary : '#aaa'} />
                },
            })}>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Search' component={SearchScreen} />
            <Tab.Screen name='Favorites' component={FavoritesScreen} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
    );
}
