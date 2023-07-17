import React from "react";
import { Box, Center, Text } from "native-base";

type Props = { 
  stars: number,
  average: string
}

const ReviewGraphRow: React.FC<Props> = ({ stars, average }) => (

  <Box flexDirection="row" alignItems="center">
    <Center size="5"><Text>{stars}</Text></Center>
    <Box width="210" height="2" borderRadius="10" bg="#dbdad7">
      <Box width={average} height="2" borderRadius="10" bg="#981D9A" />
    </Box>
  </Box>
);

export default ReviewGraphRow;