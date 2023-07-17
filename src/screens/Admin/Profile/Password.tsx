import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { ArrowLeftIcon, UserCircleIcon } from "react-native-heroicons/solid";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  ProfilePic,
  EditText,
  EditInput,
  Button,
} from "../../Usuario/Profile/styles";
import { ScrollView } from "react-native-gesture-handler";
import { PasswordAdminProps } from "../../../../App";
import { Input } from "native-base";

import COLORS from "../../../styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { ActivityIndicator } from "react-native";

const PasswordAdmin: React.FC<PasswordAdminProps> = ({ navigation }) => {
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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  useEffect(() => {
    getToken();
  }, []);

  //console.log("USER", user);

  const handleSubmit = async () => {
    const title = "Aviso";
    const message = "Tu cambio ha sido realizado con éxito";
    const result = await axios.put(
      `${process.env.IP_ADDRESS}/users/password/${user?.id}`,
      { oldPassword: currentPassword, newPassword: newPassword }
    );
    console.log(result.data);
    Alert.alert(title, message, [
      {
        text: "OK",
        onPress: () => navigation.navigate("Profile Admin"),
      },
    ]);
  };
  if (isLoading) return <ActivityIndicator />;
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          contentContainerStyle={{
            marginTop: "10%",
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity
            style={{ alignSelf: "flex-start", position: "absolute", left: 32 }}
            onPress={() => navigation.navigate("Profile Admin")}
          >
            <ArrowLeftIcon color="black" size={30} />
          </TouchableOpacity>
          <ProfilePic
            source={{
              uri: user?.photoURL
                ? user?.photoURL
                : "https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png",
            }}
            style={{ marginTop: 41 }}
          />
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: 43,
              marginLeft: 62,
              fontFamily: `${COLORS.FONTS.OUTFITMEDIUM}`,
            }}
          >
            Contraseña Actual:
          </Text>
          <Input
            width="70%"
            variant="underlined"
            secureTextEntry={true}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            //placeholder="Underlined"
            style={{ alignSelf: "center", marginTop: 2 }}
          />
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: 43,
              marginLeft: 62,
              fontFamily: `${COLORS.FONTS.OUTFITMEDIUM}`,
            }}
          >
            Nueva Contraseña:
          </Text>
          <Input
            width="70%"
            variant="underlined"
            secureTextEntry={true}
            value={newPassword}
            onChangeText={setNewPassword}
            //placeholder="Underlined"
            style={{ alignSelf: "center", marginTop: 2, width: "80%" }}
          />
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: 43,
              marginLeft: 62,
              fontFamily: `${COLORS.FONTS.OUTFITMEDIUM}`,
            }}
          >
            Confirmar Contraseña:
          </Text>
          <Input
            width="70%"
            variant="underlined"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            //placeholder="Underlined"
            style={{ alignSelf: "center", marginTop: 2, width: "80%" }}
          />
          <Button onPress={handleSubmit}>
            <Text
              style={{
                fontFamily: `${COLORS.FONTS.OUTFITBOLD}`,
                color: "#fff",
                fontSize: 17,
                alignSelf: "center",
                padding: 17,
              }}
            >
              Guardar
            </Text>
          </Button>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export { PasswordAdmin };
