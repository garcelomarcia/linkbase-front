import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Home from "../../screens/Usuario/Home/Home";
import CategoryDetail from "../../screens/Usuario/CategoryDetail/CategoryDetail";
import ProviderScreen from "../ProviderScreen";

type RootStackParamList = {
  Overview: undefined; 
  Provider: { name: string };
  CategoryDetail: { categoryName: string, serviceFilter: number | undefined | string};
}

const HomeNavigator: React.FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Overview" component={Home}/>
      <Stack.Screen name="Provider" component={ProviderScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
    </Stack.Navigator>
  );
}

export type OverviewProps = NativeStackScreenProps<RootStackParamList, "Overview">;
export type ProviderProps = NativeStackScreenProps<RootStackParamList, "Provider">;
export type CategoryProps = NativeStackScreenProps<RootStackParamList, "CategoryDetail">;
export default HomeNavigator;