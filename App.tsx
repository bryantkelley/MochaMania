import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListView, MapView, Settings } from "./screens";
import { Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RatingsProvider } from "./utils/Ratings";
import { AddRating } from "./screens/AddRating";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tabs = createBottomTabNavigator();

const ListStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();

const ListScreens = () => (
  <ListStack.Navigator>
    <ListStack.Screen
      name="MochaList"
      component={ListView}
      options={{
        title: "Mocha List",
        headerRight: () => <Button title="Add" />,
      }}
    />
    <ListStack.Screen
      name="ListAddRating"
      component={AddRating}
      options={{
        title: "Add Rating",
        headerRight: () => <Button title="Save" />,
      }}
    />
  </ListStack.Navigator>
);

const MapScreens = () => (
  <MapStack.Navigator>
    <MapStack.Screen
      name="MochaMap"
      component={MapView}
      options={{
        title: "Mocha Map",
        headerRight: () => <Button title="Add" />,
      }}
    />
    <MapStack.Screen
      name="MapAddRating"
      component={AddRating}
      options={{
        title: "Add Rating",
        headerRight: () => <Button title="Save" />,
      }}
    />
  </MapStack.Navigator>
);

export default function App() {
  return (
    <RatingsProvider>
      <NavigationContainer>
        <Tabs.Navigator screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="ListView"
            component={ListScreens}
            options={{
              title: "Mocha List",
              tabBarIcon: ({ color, size }) => <Ionicons color={color} size={size} name="list" />,
            }}
          />
          <Tabs.Screen
            name="MapView"
            component={MapScreens}
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
