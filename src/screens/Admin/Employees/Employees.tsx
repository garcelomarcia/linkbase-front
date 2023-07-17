import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import {
  Container,
  Title,
  Description,
  EmployeeSearch,
  SearchIcon,
} from "./styles";
import { EmployeeInfo } from "./EmployeeInfo";
import { EmployeesProps } from "../../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import jwtDecode from "jwt-decode";
import axios from "axios";

interface Empleado {
  id: string;
  fullName: string;
  company: string;
  rol: string;
  charge: string;
  email: string;
  photoURL: string;
}
interface IUser {
  id: number;
  name: string;
  email: string;
  rol: string;
  CompanyId: number;
  fullName: string;
  company: string;
  photoURL: string;
}

interface ICompany {
  id: number;
  name: string;
  address: string;
  phone: string;
  users: Empleado[];
  company: string;
}

const Employees: React.FC<EmployeesProps> = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  const [companyInfo, setCompanyInfo] = useState<ICompany | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [userphotoURL, setUserphotoURL] = useState<string | null>(null);

  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [filteredEmpleados, setFilteredEmpleados] = useState<Empleado[]>([]);

  const isFocused = useIsFocused();

  const handleDeleteEmployee = (id: string) => {
    const updatedEmpleados = empleados.filter((empleado) => empleado.id !== id);
    setEmpleados(updatedEmpleados);
    setFilteredEmpleados(updatedEmpleados);
  };

  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const decodedToken: any = jwtDecode(value);
          const response = await axios.get(
            `${process.env.IP_ADDRESS}/users/${decodedToken.user.id}`
          );
          const user = response.data as IUser;
          setUserInfo(user);
          setUserphotoURL(user.photoURL);

          const companyResponse = await axios.get(
            `${process.env.IP_ADDRESS}/companies/${user.CompanyId}`
          );
          const company = companyResponse.data as ICompany;
          //console.log("COMPANY", company);

          setCompanyInfo(company);
          setCompanyName(company.name);
        }
      };

      fetchData();
    }
  }, [isFocused]);

  // console.log("USERDATA", userInfo);
  // console.log("COMPANYDATA", companyInfo);
  console.log("COMPANYNAME", companyName);

  const [search, setSearch] = useState("");

  const handleSearch = (query: string) => {
    if (query === "") return filteredEmpleados;
    const filteredItems = filteredEmpleados.filter((empleado) =>
      empleado.fullName.includes(query)
    );
    return filteredItems.map((empleado) => ({
      ...empleado,
      photoURL: empleado.photoURL ? empleado.photoURL : "",
    }));
  };

  useEffect(() => {
    if (companyInfo?.users) {
      setEmpleados(companyInfo.users);
      setFilteredEmpleados(companyInfo.users);
    }
  }, [companyInfo]);

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
    <Container>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <View style={{ flex: 1 }}>
          <Title style={{ marginLeft: "30%", marginBottom: "5%" }}>
            Trabajadores
          </Title>
        </View>
        <Appbar.Header style={{ marginLeft: "10%" }}>
          <Appbar.Action icon="logout" onPress={handleLogout} />
        </Appbar.Header>
      </View>

      <Description>
        Ve y administra a los empleados de {companyInfo?.name}
      </Description>
      <View>
        <EmployeeSearch
          placeholder="Busca Colaboradores"
          placeholderTextColor={"#666161"}
          value={search}
          onChangeText={(query) => setSearch(query)}
        />
        <SearchIcon color="black" />
      </View>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {handleSearch(search)?.map((empleado) => {
          console.log("EMPLEADO", empleado);
          return (
            <EmployeeInfo
              key={empleado.id}
              id={empleado.id}
              fullName={empleado.fullName}
              company={companyName ? companyName : ""}
              photoURL={empleado.photoURL ? empleado.photoURL : ""}
              rol={empleado.rol}
              charge={empleado.charge}
              email={empleado.email}
              onDelete={handleDeleteEmployee}
            />
          );
        })}
      </ScrollView>
    </Container>
  );
};

export { Employees };
