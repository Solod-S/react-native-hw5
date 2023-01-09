import { createStackNavigator } from "@react-navigation/stack";

import { Context } from "./context";
import { useEffect } from "react";
import { useState } from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import { MaterialIcons } from "@expo/vector-icons";
// import { Button, TouchableOpacity, Image } from "react-native";

import Home from "./screens/Home";
import screens from "./screens";
const { LoginScreen, RegistrationScreen, CommentsScreen } = screens;

const GeneralStack = createStackNavigator();
// const MainStack = createStackNavigator();

const useRoute = () => {
  const [currentPath, setCurrentPath] = useState(null);

  return (
    <>
      <Context.Provider value={{ setCurrentPath, currentPath }}>
        <GeneralStack.Navigator initialRouteName="Auth">
          <GeneralStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <GeneralStack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
          <GeneralStack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          ></GeneralStack.Screen>
          {/* <GeneralStack.Screen
          options={{ title: "Комментарии", headerTitleAlign: "center" }}
          name="Comments"
          component={CommentsScreen}
        /> */}
        </GeneralStack.Navigator>
        {/* <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        ></MainStack.Screen>
      </MainStack.Navigator> */}
      </Context.Provider>
    </>
  );
};

export default useRoute;
