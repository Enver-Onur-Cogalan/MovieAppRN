import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MovieDetailScreen from "../screens/stack/MovieDetailScreen";
import AppTabs from "./AppTabs";
import ActorDetailScreen from "../screens/stack/ActorDetailScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={AppTabs} />
            <Stack.Screen name="Detail" component={MovieDetailScreen} />
            <Stack.Screen name="ActorDetail" component={ActorDetailScreen} />
        </Stack.Navigator>
    );
}