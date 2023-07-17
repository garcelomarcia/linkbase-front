import React from "react";
import { Center, Flex, Skeleton, VStack } from "native-base";

const ProviderScreenSkeleton = () => (

  <Center w="100%">
    <VStack 
      w="100%" 
      height="100%"
      borderWidth="1" 
      overflow="hidden"
      borderColor="coolGray.200"
    >
      <Skeleton flex="0" flexBasis="199" />
      <Center flex="0.15" width="320" alignSelf="center">
        <Skeleton.Text width="120" lines={1} startColor="fuchsia.50"/>
      </Center>
      <Skeleton flex="0.18" width="320" alignSelf="center" rounded="xl" />
      <Flex flex="0.61" width="320" my="4" alignSelf="center" justifyContent="center">
        <Flex flexDirection="row" width="100%" mb="4" height="auto">
          <Flex flex="2">
            <Skeleton.Text width="100%" lines={5} />
          </Flex>
          <Flex flex="1" alignItems="center" justifyContent="center">
            <Skeleton size="20" rounded="full" startColor="fuchsia.100" />
          </Flex>
        </Flex>
        <Skeleton height="110" rounded="xl" />
      </Flex>
      <Skeleton flex="0" width="320" alignSelf="center" rounded="xl" startColor="fuchsia.200" />
    </VStack>
  </Center>
);

export default ProviderScreenSkeleton;