import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListView, MapView, Settings } from "./screens";
import { Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RatingsProvider } from "./utils/Ratings";
import { AddRating } from "./screens/AddRating";
import { DetailView } from "./screens/DetailView";
import { EditRating } from "./screens/EditRating";

const Tabs = createBottomTabNavigator();

const ListStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();

const ListScreens = () => (
  <ListStack.Navigator>
    <ListStack.Screen
      name="MainView"
      component={ListView}
      options={{
        title: "Mocha List",
        headerRight: () => <Button title="Add" />,
      }}
    />
    <ListStack.Screen
      name="AddRating"
      component={AddRating}
      options={{
        title: "Add Rating",
        headerRight: () => <Button title="Save" />,
      }}
    />
    <ListStack.Screen
      name="DetailView"
      component={DetailView}
      options={{
        title: "Rating Details",
        headerRight: () => <Button title="Edit" />,
      }}
    />
    <ListStack.Screen
      name="EditRating"
      component={EditRating}
      options={{
        title: "Edit Rating",
        headerRight: () => <Button title="Save" />,
      }}
    />
  </ListStack.Navigator>
);

const MapScreens = () => (
  <MapStack.Navigator>
    <MapStack.Screen
      name="MainView"
      component={MapView}
      options={{
        title: "Mocha Map",
        headerRight: () => <Button title="Add" />,
      }}
    />
    <MapStack.Screen
      name="AddRating"
      component={AddRating}
      options={{
        title: "Add Rating",
        headerRight: () => <Button title="Save" />,
      }}
    />
    <MapStack.Screen
      name="DetailView"
      component={DetailView}
      options={{
        title: "Rating Details",
        headerRight: () => <Button title="Edit" />,
      }}
    />
    <MapStack.Screen
      name="EditRating"
      component={EditRating}
      options={{
        title: "Edit Rating",
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
