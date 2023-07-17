import React from "react";
import { Text, View } from "react-native";
import { Container, ImageContainer } from "./styles";
import { MyTabs } from "../../../components/Navbar/Navbar";

//Tabs

const Main: React.FC = () => {
  return (
    // <NavbarContainer>
    <Container>
      {/* <View style={{ flex: 1,  justifyContent: "center" }}> */}
      <ImageContainer>
        <MyTabs />
      </ImageContainer>
      {/* </View> */}
    </Container>
    // </NavbarContainer>
  );
};

export default Main;
