import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  PasswordSvg,
  BoardSvg,
  GearSvg,
  QmSvg,
} from "../../../assets/svgImages/Usuario/Profile";

import {
  Container,
  ProfilePic,
  Title,
  Description,
  Button,
  Line,
  Option,
  Logout,
} from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { User } from "../../../components/ProviderScreen";

type ProfileDetailProps = {
  navigation: any; // o cualquier otro tipo de objeto de navegación que estés usando
};

const ProfileDetail: React.FC<ProfileDetailProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [user, setUser] = useState<User>({} as User);
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
          setUser(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isFocused) getToken();
  }, [isFocused]);

  const handleLogout = () => {
    const title = "Confirmar";
    const message = "Estás seguro que deseas cerrar sesión?";
    Alert.alert(title, message, [
      {
        text: "Cancelar",
      },
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Intro" }],
            })
          );
        },
      },
    ]);
  };

  if (isLoading) return <ActivityIndicator />;

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <Container
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 108,
          marginBottom: 15,
          backgroundColor: "white",
        }}
      >
        <ProfilePic
          source={{
            uri: user.photoURL
              ? user.photoURL
              : "https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png",
          }}
        />
        <Title>{user.fullName}</Title>
        <Description>{user.email}</Description>
        <Button onPress={() => navigation.navigate("Edit")}>
          <Text
            style={{
              fontFamily: "Outfit_700Bold",
              color: "#fff",
              fontSize: 17,
              alignSelf: "center",
              padding: 17,
            }}
          >
            Editar Perfil
          </Text>
        </Button>
        <Line />
        <View style={{ marginTop: 54, alignSelf: "flex-start" }}>
          <TouchableOpacity
            style={styles.options}
            onPress={() => navigation.navigate("Password")}
          >
            <PasswordSvg style={{ marginLeft: 41 }} />
            <Option>Cambiar contraseña</Option>
          </TouchableOpacity>
        </View>
        <Logout onPress={handleLogout}>
          <Text
            style={{
              fontFamily: "Outfit_700Bold",
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
    marginBottom: 21,
  },
});
export { ProfileDetail };
