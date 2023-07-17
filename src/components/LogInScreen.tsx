import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ArrowBackIcon,
  Box,
  Button,
  Input,
  Modal,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import { LogInProps } from "../../App";
import { ScrollView } from "react-native-gesture-handler";
import jwtDecode from "jwt-decode";

type HandleInput = (
  value: string,
  input: React.Dispatch<React.SetStateAction<string>>
) => void;

type LogInRequestBody = {
  email: string;
  password: string;
};

const LogInScreen: React.FC<LogInProps> = ({ navigation, route }) => {
  const isAdmin: boolean = route.params.isAdmin;
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showModalWrongCredentials, setShowModalWrongCredentials] =
    useState(false);
  const [logInError, setLogInError] = useState("");

  useEffect(() => {
    setIsSubmitDisabled(true);

    if (emailInput && passwordInput) setIsSubmitDisabled(false);
  }, [emailInput, passwordInput]);

  const handleInput: HandleInput = (value, input) => {
    input(value);
  };

  const handleSubmit = async (): Promise<void> => {
    const logInRequestBody: LogInRequestBody = {
      email: emailInput,
      password: passwordInput,
    };

    try {
      const user = await axios.post(
        `${process.env.IP_ADDRESS}/users/login`,
        logInRequestBody
      );
      await AsyncStorage.setItem("token", user.data.token);

      // Obtiene la información del usuario
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        const decodedToken: any = jwtDecode(value);
        const response = await axios.get(
          `${process.env.IP_ADDRESS}/users/${decodedToken.user.id}`
        );
        const user = response.data;

        //console.log("USERSSS", user); // Aquí tienes acceso al usuario logueado

        // Comprueba si el usuario es un admin y redirige a la pantalla de admin
        if (
          user.rol === "superAdmin" ||
          user.rol === "adminProviders" ||
          user.rol === "adminReviews"
        ) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home Admin", params: { isAdmin: true } }],
          });
        } else if (user.rol === "checker") {
          navigation.reset({
            index: 0,
            routes: [{ name: "Employees", params: { isAdmin: true } }],
          });
        } else {
          navigation.reset({ index: 0, routes: [{ name: "Main" }] });
        }
      } else {
        // Si no se pudo obtener el token, muestra un mensaje de error
        throw new Error("No se pudo obtener el token");
      }
    } catch (error: any) {
      const errorMessage = error.response.data;
      const formattedErrorMessage =
        errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
      setLogInError(formattedErrorMessage);
      setShowModalWrongCredentials(true);
    }
  };

  return (
    <Box
      safeArea
      display="flex"
      flex="1"
      justifyContent="flex-start"
      bgColor="white"
    >
      <Box px="39" pt="10" pb="6" flexDirection="row" alignItems="center">
        <Pressable onPress={() => navigation.navigate("Intro")}>
          <ArrowBackIcon size="6" color="#464444" />
        </Pressable>
        <Text
          mx="50"
          fontFamily="body"
          fontSize="3xl"
          fontWeight="700"
          color="#464444"
        >
          Iniciar Sesión
        </Text>
      </Box>
      <ScrollView>
        <VStack space={5} alignItems="center">
          <Text px="16" fontFamily="body" fontWeight="400" textAlign="center">
            {isAdmin
              ? "LinkBase te permite encontrar y conectar con el proveedor indicado para hacer crecer tu negocio."
              : "Inicia sesión o crea una cuenta para empezar a conectar con proveedores cerca de ti"}
          </Text>
          <Stack space={3} width="75%" mx="auto" alignItems="center" mt="6">
            <Input
              size="md"
              variant="filled"
              placeholder="Nombre de Usuario o Email"
              shadow="2"
              borderRadius="15"
              width="320"
              height="60"
              isFocused={false}
              focusOutlineColor="none"
              _focus={{ bg: "none" }}
              onChangeText={(value) => handleInput(value, setEmailInput)}
              value={emailInput}
              autoCapitalize={"none"}
            />
            <Input
              size="md"
              variant="filled"
              placeholder="Contraseña"
              shadow="2"
              borderRadius="15"
              width="320"
              height="60"
              isFocused={false}
              focusOutlineColor="none"
              _focus={{ bg: "none" }}
              type="password"
              onChangeText={(value) => handleInput(value, setPasswordInput)}
              value={passwordInput}
            />
          </Stack>
          <Pressable onPress={() => navigation.navigate("Intro")}>
            <Box
              px="39"
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
            >
              <Text
                fontFamily="body"
                fontSize="lg"
                fontWeight="500"
                color="#666161"
              >
                Olvidaste tu contraseña?
              </Text>
            </Box>
          </Pressable>
          <Box display="flex" flexDirection="row">
            <Button
              disabled={isSubmitDisabled}
              onPress={handleSubmit}
              width="320"
              height="60"
              borderRadius="15"
              bg={isSubmitDisabled ? "#808080" : "#981D9A"}
              _pressed={{ bg: "#6f1570" }}
              shadow="9"
            >
              <Text
                fontFamily="heading"
                fontSize="lg"
                fontWeight="700"
                color="white"
              >
                Iniciar Sesión
              </Text>
            </Button>
          </Box>
        </VStack>
      </ScrollView>
      <Modal
        isOpen={showModalWrongCredentials}
        onClose={() => setShowModalWrongCredentials(false)}
      >
        <Modal.Content maxWidth="400">
          <Modal.Header>Algo no anda bien...</Modal.Header>
          <Modal.Body>
            <Text>{logInError}, please try again.</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModalWrongCredentials(false);
              }}
            >
              Regresar
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default LogInScreen;
