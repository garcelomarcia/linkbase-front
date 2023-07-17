// import { Home } from "../screens/Usuario/Home/Home";
// import { IntroScreen } from "../screens/Usuario/IntroScreen/Intro";
// import { Mas } from "../screens/Usuario/Mas/Mas";

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// import { Home } from "../screens/Usuario/Home/Home";
// import { IntroScreen } from "../screens/Usuario/IntroScreen/Intro";
// import { Mas } from "../screens/Usuario/Mas/Mas";

// const Stack = createStackNavigator();

// const MainStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="IntroScreen" component={IntroScreen} />
//       <Stack.Screen name="Mas" component={Mas} />
//     </Stack.Navigator>
//   );
// };

// const Routes = () => {
//   return (
//     <NavigationContainer>
//       <MainStack />
//     </NavigationContainer>
//   );
// };

// export default Routes;
export default {
  LOGIN: "Login",
  REGISTER: "Register",
  FORGOT_PASSWORD: "Forgot Password",

  HOME: "Home",
  HOME_TAB: "Home Tab",
  HOME_DRAWER: "Home Drawer",

  // WALLET: "Wallet",
  // WALLET_DRAWER: "Wallet Drawer",

  // NOTIFICATIONS: "Notifications",
  // NOTIFICATIONS_DRAWER: "Notifications Drawer",

  SETTINGS: "Settings",
  ACCOUNT_SETTINGS: "Account Settings",
  SETTINGS_NAVIGATOR: "Settings Navigator",

  SETTINGS_DETAIL: "Settings Detail",
  PROFILE: "My Profile",
  MAS: "Mas",
};
