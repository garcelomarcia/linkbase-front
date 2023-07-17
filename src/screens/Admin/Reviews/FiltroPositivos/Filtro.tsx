import React from "react";
import {
  Menu,
  Button,
  VStack,
  Center,
  NativeBaseProvider,
  Text,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

//colors
import COLORS from "../../../../styles/theme";

function FiltroPositivos() {
  const [shouldOverlapWithTrigger] = React.useState(false);
  const [position, setPosition] = React.useState("auto");
  return (
    <VStack space={2} alignSelf="flex-start" w="100%">
      <Menu
        w="160"
        shouldOverlapWithTrigger={shouldOverlapWithTrigger}
        // @ts-ignore
        placement={position == "auto" ? undefined : position}
        trigger={(triggerProps: any) => {
          return (
            <Button
              alignSelf="center"
              variant="solid"
              backgroundColor="#FFFFFF"
              colorScheme="dark"
              borderRadius={20}
              width="320%"
              shadow={2}
              height={10}
              startIcon={
                <Ionicons name="menu-outline" size={15} color="#000000" />
              }
              endIcon={
                <Ionicons
                  name="chevron-down-outline"
                  size={16}
                  color="#000000"
                  style={{marginStart: "65%"}}
                />
              }
              {...triggerProps}
            >
              <Text >Filtrar</Text>
            </Button>
          );
        }}
      >
        <Menu.Item>Positivos</Menu.Item>
        <Menu.Item>Negativos</Menu.Item>
      </Menu>
    </VStack>
  );
}

export default FiltroPositivos;
