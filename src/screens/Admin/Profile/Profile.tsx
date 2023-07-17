import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  PasswordSvg,
  BoardSvg,
  GearSvg,
  QmSvg,
} from "../../../assets/svgImages/Usuario/Profile/";

import {
  Container,
  ProfilePic,
  Title,
  Description,
  Button,
  Line,
  Option,
  Logout,
} from "../../Usuario/Profile/styles";
import { ProfileAdminProps } from "../../../../App";
import { ArrowBackIcon } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

import COLORS from "../../../styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { CommonActions } from "@react-navigation/native";

const ProfileAdmin: React.FC<ProfileAdminProps> = ({ navigation }) => {
  interface User {
    CompanyId: number | null;
    ProviderId: number | null;
    charge: string;
    createdAt: string;
    email: string;
    fullName: string;
    id: number;
    isPending: boolean;
    password: string;
    photoURL: string;
    rol: string;
    salt: string;
    updatedAt: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const decodedToken: any = jwtDecode(value);
          const response = await axios.get(
            `${process.env.IP_ADDRESS}/users/${decodedToken.user.id}`
          );
          //console.log("USERDATA", response.data);

          setUser(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getToken();
  }, []);

  const handleLogout = async () => {
    try {
      // eliminar el token de la sesión
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    }

    // navegar al inicio de sesión y eliminar el historial de navegación
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Intro Admin" }],
      })
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <Container
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "20%",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home Admin")}>
          <ArrowBackIcon
            size="6"
            color="#464444"
            style={{ marginRight: "75%" }}
          />
        </TouchableOpacity>
        <ProfilePic
          source={{
            uri: user?.photoURL
              ? user?.photoURL
              : "https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png",
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Title>{user?.fullName}</Title>
        <Description>{user?.email}</Description>
        {/* //onPress={() => navigation.navigate("Edit")} */}
        <Line />
        <View style={{ marginTop: 54, alignSelf: "flex-start" }}>
          <TouchableOpacity
            style={styles.options}
            onPress={() => navigation.navigate("Password Admin")}
          >
            <PasswordSvg style={{ marginLeft: 41 }} />
            <Option>Cambiar contraseña</Option>
          </TouchableOpacity>
        </View>
        <Logout onPress={() => handleLogout()}>
          <Text
            style={{
              fontFamily: `${COLORS.FONTS.OUTFITLIGHT}`,
              color: "#fff",
              fontSize: 9,
              alignSelf: "center",
            }}
          >
            Cerrar Sesión
          </Text>
        </Logout>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    //marginBottom: 21,
  },
});
export { ProfileAdmin };
