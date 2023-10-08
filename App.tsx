import { StoreProvider } from "./redux/Provider";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PRIMARY_COLOR, PRIMARY_TEXT } from "./const/color";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Profile from "./views/profile/Profile";
import PlayList from "./views/playlist/PlayList";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <StoreProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: PRIMARY_COLOR,
                  height: 125,
                },
                headerTintColor: PRIMARY_TEXT,
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 16,
                },
                headerShadowVisible: false,
              }}
            >
              <Stack.Screen
                name="Home"
                component={PlayList}
                options={({ route, navigation }) => ({
                  title: "Top Tracks this Week",
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Profile")}
                      style={{ marginRight: 15 }}
                    >
                      <View>
                        <MaterialCommunityIcons
                          name="dots-horizontal"
                          size={24}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>
                  ),
                })}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                  title: "My Profile",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </StoreProvider>
  );
}
