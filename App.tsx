import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListView } from "./screens/ListView";
import { Home } from "./screens/Home";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
        <Stack.Screen
          name="ListView"
          component={ListView}
          options={{ title: "Mocha List", headerRight: () => <Button title="Add" /> }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
