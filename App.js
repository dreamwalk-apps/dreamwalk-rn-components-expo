import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Menu from "./example/src/Menu";
import Inputs from "./example/src/Inputs";
import Buttons from "./example/src/Buttons";
import ValueSlides from "./example/src/ValueSlides";

const Stack = createStackNavigator();

const defaultOptions = {
    title: () => {},
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"menu"} component={Menu} options={{ title: "Menu" }} />
                <Stack.Screen name={"inputs"} component={Inputs} options={{ title: "Inputs" }} />
                <Stack.Screen name={"buttons"} component={Buttons} options={{ title: "Buttons" }} />
                <Stack.Screen name={"value_slides"} component={ValueSlides} options={{ title: "Parallax Swiper" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
