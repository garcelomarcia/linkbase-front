import React from "react";

//text,view,etc
import { SafeAreaView, View, Text } from "react-native";

import {
  Container,
  ContentHeader,
  Title,
  Description,
  ViewButton,
  ContentBody,
  ContentFooter,
} from "./styles";

//importando svgs

// import { IntroScreenn } from "../../../assets";

const IntroScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <Container>
        <Container>
          <ContentHeader>
            <Text>Omitir</Text>
            {/* <IntroScreenn width={600} height={200} /> */}
            <Title>Conecta Con Proveedores</Title>
            <Description>
              LinkBase te permite encontrar y conectar con el proveedor indicado
              para {"\n"}hacer crecer tu negocio.
            </Description>
            <Description>LinkBase te para {"\n"}h</Description>
            <ViewButton></ViewButton>
          </ContentHeader>

          <ContentBody></ContentBody>

          <ContentFooter></ContentFooter>
        </Container>
      </Container>
    </SafeAreaView>
  );
};

export { IntroScreen };
