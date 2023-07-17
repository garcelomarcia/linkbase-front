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

type Props = {
  filtrarPorRating: (rating: number) => void;
};

function Filtro(props: Props) {
  const [shouldOverlapWithTrigger] = React.useState(false);
  const [position, setPosition] = React.useState("auto");

  const handleFiltrarPorRating = (rating: number) => {
    props.filtrarPorRating(rating);
  };
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
              shadow={1}
              height={10}
              startIcon={
                <Ionicons name="menu-outline" size={15} color="#000000" />
              }
              endIcon={
                <Ionicons
                  name="chevron-down-outline"
                  size={16}
                  color="#000000"
                />
              }
              {...triggerProps}
            >
              <Text>Rating</Text>
            </Button>
          );
        }}
      >
        <Menu.Item key={0} onPress={() => handleFiltrarPorRating(0)}>
          quitar filtro
        </Menu.Item>
        <Menu.Item key={1} onPress={() => handleFiltrarPorRating(1)}>
          1
        </Menu.Item>
        <Menu.Item key={2} onPress={() => handleFiltrarPorRating(2)}>
          2
        </Menu.Item>
        <Menu.Item key={3} onPress={() => handleFiltrarPorRating(3)}>
          3
        </Menu.Item>
        <Menu.Item key={4} onPress={() => handleFiltrarPorRating(4)}>
          4
        </Menu.Item>
        <Menu.Item key={5} onPress={() => handleFiltrarPorRating(5)}>
          5
        </Menu.Item>
      </Menu>
    </VStack>
  );
}

export default Filtro;
