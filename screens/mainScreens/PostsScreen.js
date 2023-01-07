import { createStackNavigator } from "@react-navigation/stack";
import {
  DefaultPostsScreen,
  MapScreen,
  CommentsScreen,
} from "../nestedScreens";

const NestedScreen = createStackNavigator();

const backIcon = require("../../assets/icon/arrow-left.png");

export default function PostScreen({}) {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        options={{
          title: "Комментарии",
          headerTitleAlign: "center",
          // headerShown: false,
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ padding: 10 }}
              onPress={() => navigation.navigate("PostsScreen")}
            >
              <Image source={backIcon} style={{ marginLeft: 16 }} />
            </TouchableOpacity>
          ),
        }}
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        name="MapScreen"
        options={{ headerShown: false }}
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
}
