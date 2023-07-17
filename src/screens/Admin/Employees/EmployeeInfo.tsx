import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import {
  EmployeeContainer,
  FullName,
  BusinessName,
  Role,
  Mail,
  Trash,
} from "./styles";
import axios from "axios";
import { ProfilePic } from "../../Usuario/Profile/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";


interface Empleado {
  id: string;
  fullName: string;
  company: string;
  rol: string;
  charge: string;
  email: string;
  photoURL: string;
}

interface EmployeeInfoProps extends Empleado {
  onDelete: (id: string) => void;
}


interface IUser {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  CompanyId: string;
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({
  id,
  fullName,
  company,
  charge,
  email,
  photoURL,
  onDelete,
}) => {
  console.log("IDUSER", id);

  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        setToken(value);
        const decodedToken: any = jwtDecode(value);
        const response = await axios.get(
          `${process.env.IP_ADDRESS}/users/${decodedToken.user.id}`
        );
        const user = response.data as IUser;
        setUserInfo(user);
      }
    };

    fetchData();
  }, []);

  console.log("TOKEN", token);

  const handleDelete = async () => {
    const title = "Alerta";
    const message = "¿Eliminar usuario?";
    Alert.alert(title, message, [
      {
        text: "Confirmar",
        onPress: async () => {
          try {
            const config = {
              headers: { Authorization: `Bearer ${token}` },
              data: { token: token },
            };
            await axios.delete(`${process.env.IP_ADDRESS}/users/${id}`, config);
            onDelete(id);
          } catch (error) {
            console.log(error);
          }
        },
      },
      {
        text: "Cancelar",
        onPress: () => console.log("Eliminación Cancelada"),
      },
    ]);
  };

  return (
    <EmployeeContainer>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ProfilePic
          source={{
            uri: photoURL
              ? photoURL
              : "https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png",
          }}
          style={{ height: 20, width: 20, marginLeft: 15 }}
        />
        <FullName key={id} style={{ marginLeft: 12 }}>
          {fullName}
        </FullName>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          justifyContent: "space-between",
        }}
      >
        <BusinessName>{company}</BusinessName>
        <Role key={id}>{charge}</Role>
        <TouchableOpacity onPress={handleDelete}>
          <Trash />
        </TouchableOpacity>
      </View>
      <Mail>{email}</Mail>
    </EmployeeContainer>
  );
};

export { EmployeeInfo };
