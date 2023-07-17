import React from "react";
import { PixelRatio } from "react-native";
import { Box, Button, Image, Pressable, Text, VStack } from "native-base";
import { IntroProps } from "../../App";
import IntroSvg from "../assets/svg/IntroSvg";

const Intro: React.FC<IntroProps> = ({ navigation }) => {
  type responsiveFontSize = (size: number) => number;

  const fontScale: number = PixelRatio.getFontScale();
  const getFontSize: responsiveFontSize = (size) => size / fontScale;

  return (
    <Box safeArea display="flex" flex="1" alignItems="center" bgColor="white">
      <VStack
        width="320"
        height="100%"
        justifyContent="center"
        alignItems="center"
        space={5}
      >
        <Box
          display="flex"
          flex="0.7"
          width="100%"
          mt="8"
          flexDirection="row"
          justifyContent="flex-end"
        >
          {/* <Pressable onPress={() => navigation.navigate("Main")}>
            <Text
              fontFamily="body"
              fontSize="lg"
              fontWeight="500"
              color="#666161"
            >
              Omitir
            </Text>
          </Pressable> */}
        </Box>
        <Box display="flex" flex="3">
          <IntroSvg />
        </Box>
        <Box display="flex" flex="1.3" alignItems="center">
          <Text
            pb="4"
            fontFamily="body"
            fontSize={getFontSize(25)}
            fontWeight="700"
            color="#464444"
          >
            Conecta Con Proveedores
          </Text>
          <Text
            px="5"
            textAlign="center"
            fontFamily="body"
            fontSize={getFontSize(12)}
            fontWeight="400"
            color="#000000"
          >
            LinkBase te permite encontrar y conectar con el proveedor indicado
            para hacer crecer tu negocio.
          </Text>
        </Box>
        <Box display="flex" flex="1">
          <Box display="flex" flexDirection="row">
            <Button
              width="160"
              height="60"
              borderLeftRadius="15"
              borderRightRadius="0"
              bg="#981D9A"
              shadow="9"
              _pressed={{ bg: "#6f1570" }}
              onPress={() => navigation.navigate("Log In", { isAdmin: false })}
            >
              <Text
                fontFamily="body"
                fontSize="lg"
                fontWeight="700"
                color="white"
              >
                Iniciar Sesión
              </Text>
            </Button>
            <Button
              width="160"
              height="60"
              borderLeftRadius="0"
              borderRightRadius="15"
              bg="#F3F3F3"
              shadow="9"
              _pressed={{ bg: "#d9d9d9" }}
              onPress={() => navigation.navigate("Register")}
            >
              <Text
                fontFamily="body"
                fontSize="lg"
                fontWeight="700"
                color="545151"
              >
                Registrarse
              </Text>
            </Button>
          </Box>
          <Box display="flex" pt="5">
            <Pressable
              onPress={() =>
                navigation.navigate("Intro Admin", { isAdmin: true })
              }
            >
              <Text
                textAlign="center"
                fontFamily="body"
                fontSize="sm"
                fontWeight="300"
                color="#981D9A"
              >
                Eres Administrador?
              </Text>
            </Pressable>
          </Box>
        </Box>
        <Box display="flex" flex="1" mb="8" justifyContent="flex-end">
          <Image
            height="5"
            width="20"
            resizeMode="contain"
            source={require("../assets/images/netGlobal.png")}
            alt="Net Global Solutions Logo"
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default Intro;
