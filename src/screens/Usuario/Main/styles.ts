import styled from "styled-components/native";

import { Platform } from "react-native";

import { HStack, Text, IconButton, Icon } from "native-base";

export const NavbarContainer = styled(HStack)`
  padding-top: ${Platform.OS === "ios" ? "48px" : "24px"};
  padding-left: 24px;
  padding-right: 24px;
  background-color: #fff;
`;

export const NavbarTitle = styled(Text)`
  color: #000;
  font-weight: bold;
  font-size: 18px;
`;

export const NavbarLeft = styled(HStack)`
  flex: 1;
  justify-content: flex-start;
`;

export const NavbarRight = styled(HStack)`
  flex: 1;
  justify-content: flex-end;
`;

export const NavbarButton = styled(IconButton)`
  background-color: transparent;
`;

export const NavbarIcon = styled(Icon)`
  
`;

export const Container = styled.View`
  flex: 1;
  // alignItems: "center",
  justify-content: center;
`;
export const ImageContainer = styled.View`
  flex: 3;
  padding-top: 0;
`;


// container: {
//   flex: 1,
//   // alignItems: "center",
//   justifyContent: "center",
// },
// text: {
//   flex: 1,
//   paddingTop: 0,
// },
// imageContainer: {
//   flex: 3,
//   paddingTop: 0,
// },
