import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListView, MapView, Settings } from "./screens";
import { Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RatingsProvider } from "./utils/Ratings";

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <RatingsProvider>
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Group>
            <Tabs.Screen
              name="ListView"
              component={ListView}
              options={{
                title: "Mocha List",
                headerRight: () => <Button title="Add" />,
                tabBarIcon: ({ color, size }) => <Ionicons color={color} size={size} name="list" />,
              }}
            />
          </Tabs.Group>
          <Tabs.Group>
            <Tabs.Screen
              name="MapView"
              component={MapView}
              options={{
                title: "Mocha Map",
                headerRight: () => <Button title="Add" />,
                tabBarIcon: ({ color, size }) => <Ionicons color={color} size={size} name="map" />,
              }}
            />
          </Tabs.Group>
          <Tabs.Group>
            <Tabs.Screen
              name="Settings"
              component={Settings}
              options={{
                title: "Settings",
                tabBarIcon: ({ color, size }) => <Ionicons color={color} size={size} name="cog" />,
              }}
            />
          </Tabs.Group>
        </Tabs.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </RatingsProvider>
  );
}
