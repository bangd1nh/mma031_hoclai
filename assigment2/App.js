import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import LoginScreen from "./src/screen/LoginScreen";
import MainScreen from "./src/screen/MainScreen";

const Stack = createStackNavigator();

export default function App() {
    const [initialRoute, setInitialRoute] = useState("Login");

    useEffect(() => {
        const checkLogin = async () => {
            const username = await AsyncStorage.getItem("username");
            const password = await AsyncStorage.getItem("password");
            if (username && password) {
                setInitialRoute("Main");
            }
        };
        checkLogin();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Main"
                    component={MainScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
