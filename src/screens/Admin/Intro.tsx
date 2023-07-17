import React from "react";
import { Box, Button, Image, Pressable, Text, VStack } from "native-base";
import { IntroAdminProps } from "../../../App";
import { IntroAdminSvg } from "../../assets/svgImages/Admin/Intro/";

const IntroAdmin: React.FC<IntroAdminProps> = ({ navigation }) => {

return(
  <Box safeArea display="flex" flex="1" justifyContent="center" bgColor="white">
    <Pressable onPress={() => navigation.navigate("Main")}>
      <Box
        px="39"
        py="10"
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
      >
      </Box>
    </Pressable>
    <VStack space={5} alignItems="center" mb="10">
      <IntroAdminSvg/>
      <Text
        fontFamily="body"
        fontSize="3xl"
        fontWeight="700"
        textAlign="center"
        color="#464444"
      >
        Administra Tu Negocio
      </Text>
      <Text
        paddingBottom="6"
        px="12"
        fontFamily="body"
        fontWeight="400"
        textAlign="center"
      >
        LinkBase te permite encontrar y conectar con el proveedor indicado para hacer crecer tu negocio.
      </Text>
      <Box display="flex" flexDirection="row">
        <Button
          onPress={() => navigation.navigate("Log In", {isAdmin: true})}
          width="300"
          height="60"
          borderLeftRadius="15"
          borderRightRadius="15"
          bg="#981D9A"
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
      <Pressable onPress={() => navigation.navigate("Intro")}>
        <Text fontFamily="body" fontWeight="300" color="#981D9A">
          Eres Cliente?
        </Text>
      </Pressable>
    </VStack>
    <Image
      source={require("../../assets/images/netGlobal.png")}
      alt="Net Global Logo"
      alignSelf="center"
      resizeMode="contain"
      size="lg"
    />
  </Box>
)};

export default IntroAdmin;
