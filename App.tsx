import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListView, MapView, Settings } from "./screens";
import { Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RatingsProvider } from "./utils/Ratings";
import { AddRating } from "./screens/AddRating";

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <RatingsProvider>
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen
            name="AddRating"
            component={AddRating}
            options={{
              title: "Add Rating",
              headerRight: () => <Button title="Save" />,
              tabBarIcon: ({ color, size }) => <Ionicons color={color} size={size} name="cafe" />,
            }}
          />
          <Tabs.Screen
            name="ListView"
            component={ListView}
            options={{
              title: "Mocha List",
              tabBarIcon: ({ color, size }) => <Ionicons color={color} size={size} name="list" />,
            }}
          />
          <Tabs.Screen
            name="MapView"
            component={MapView}
            options={{
              title: "Mocha Map",
              tabBarIcon: ({ color, size }) => <Ionicons color={color} size={size} name="map" />,
            }}
          />
          <Tabs.Screen
            name="Settings"
            component={Settings}
            options={{
              title: "Settings",
              tabBarIcon: ({ color, size }) => <Ionicons color={color} size={size} name="cog" />,
            }}
          />
        </Tabs.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </RatingsProvider>
  );
}
