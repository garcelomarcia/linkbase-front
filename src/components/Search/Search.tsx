import React from "react";
import { VStack, Input, Icon, Heading } from "native-base";
import { Ionicons } from "@expo/vector-icons";

function SearchBas() {
  return (
    <VStack space={5} w="100%" maxW="300px">
      <Input
        placeholder="¿Qué estás buscando?"
        variant="filled"
        width="100%"
        borderRadius="12"
        py="1"
        px="2"
        InputLeftElement={
          <Icon
            ml="2"
            size="4"
            color="gray.400"
            as={<Ionicons name="ios-search" />}
          />
        }
      />
    </VStack>
  );
}

export default SearchBas;
