import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Main/HomeScreen";

export type MainStackParamList = {
    Home: undefined;
    Profile: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
