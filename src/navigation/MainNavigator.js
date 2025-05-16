import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import AppTabs from "./AppTabs";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={AppTabs} />
            <Stack.Screen name="Detail" component={MovieDetailScreen} />
        </Stack.Navigator>
    );
}