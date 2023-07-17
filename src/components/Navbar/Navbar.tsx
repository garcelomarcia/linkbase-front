import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens
//import { Home } from "../../screens/Usuario/Home/Home";
import { IntroScreen } from "../../screens/Usuario/IntroScreen/Intro";
import { Mas } from "../../screens/Usuario/Mas/Mas";
import { Profile } from "../../screens/Usuario/Profile/Profile";

//ROUTES
import { ROUTES } from "../../routes/index";

//ICON
import Icon from "react-native-vector-icons/Ionicons";

//ICON PERSONALIZADO
import { UserSvg } from "../../assets/svgImages/Usuario/Home";


//import Icon from "react-native-vector-icons/EvilIcons";


//COLORS
import COLORS from "../../styles/theme";
import HomeNavigator from "../Navigators/HomeNavigator";

const ICONS_MAP = {
  "Home": {
    iconNameFocused: "search",
    iconNameUnfocused: "search-outline",
  },
  [ROUTES.PROFILE]: {
    iconNameFocused: "person-circle",
    iconNameUnfocused: "person-circle-outline",
  },
  [ROUTES.MAS]: {
    iconNameFocused: "list",
    iconNameUnfocused: "list-outline",
  },
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.COLORS.LINKBASECOLOR,
        tabBarShowLabel: false,
        // tabBarStyle: { height: 65, borderRadius: 25, margin: 5, },
        tabBarStyle: { height: 65 },
        tabBarIcon: ({ color, size, focused }) => {
          const { iconNameFocused, iconNameUnfocused } = ICONS_MAP[route.name];

          return (
            <Icon
              name={focused ? iconNameFocused : iconNameUnfocused}
              size={24}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name={"Home"} component={HomeNavigator} />
      <Tab.Screen name={ROUTES.PROFILE} component={Profile} />
      {/* <Tab.Screen name={ROUTES.MAS} component={Mas} /> */}
    </Tab.Navigator>
  );
}

export { MyTabs };
