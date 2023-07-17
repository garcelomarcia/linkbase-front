import React, { useState } from "react";
import { PixelRatio } from "react-native";
import axios from "axios";
import { Box, HStack, Image, Text } from "native-base";
import { Review } from "../components/ProviderScreen";
import StarSvg from "../assets/svg/StarSvg";

type Props = { review: Review }
type ResponsiveFontSize = (size: number) => number;

const ReviewCardModal: React.FC<Props> = ({ review }) => {

  const [foundImage, setFoundImage] = useState<boolean>(false)
  const fontScale: number = PixelRatio.getFontScale();
  const getFontSize: ResponsiveFontSize = size => size / fontScale;
  let formattedFirstName;
  
  if (review.User.fullName) {

    const userFirstName: string = review.User.fullName.trim().split(/(?<=^\S+)\s/)[0];
    formattedFirstName = userFirstName.charAt(0).toUpperCase() + userFirstName.slice(1);
  }

  const checkImageURL = (url: string): Element => {

    axios.get(url)
      .then(() => setFoundImage(true))
      .catch(() => setFoundImage(false));

    if (foundImage) {
      return (
        <Image 
          size="47"
          borderRadius="10"
          alt="User" 
          source={{ uri: url }} 
        /> 
      );
    }

    return (
      <Image 
        size="47"
        borderRadius="10"
        alt="User" 
        source={require("../assets/images/userImage.png")} 
      />
    );
  }

  return (
    <Box 
      width="320" 
      height="auto"
    >
      <Box
        width="100%"
        height="78"
        justifyContent="center"
      >
        <HStack>
          <Box 
            flexDirection="row"
            width="50%" 
            height="100%"
            px="5"
            alignItems="center"
            justifyContent="flex-start"
          >
            {checkImageURL(review.User.photoURL)}
            <Box pl="4">
              <Text
                fontFamily="body" 
                fontSize={getFontSize(18)}
                fontWeight="700" 
                color="#2B273C"
              >{formattedFirstName}</Text>
              <Text 
                fontSize={getFontSize(12)} 
                color="#757280"
              >{new Date(review.createdAt).toLocaleDateString()}</Text>
            </Box>
          </Box>
          <Box 
            flexDirection="row"
            width="50%" 
            height="100%"
            px="5"
            alignItems="center"
            justifyContent="center"
          >
            <HStack>
            {[...Array(5)].map((element, index) => (
              <StarSvg 
                key={index} 
                size={19} 
                fill={review.stars >= index + 1 ? "#981D9A" : "#BAB1B1"}
              />
            ))}
            </HStack>
          </Box>
        </HStack>
      </Box>
    {review.text 
    ? <Box 
        width="100%"
        height="auto"
        padding="4"
        alignItems="center"
        borderTopWidth="1"
        borderColor="#d1d1d1"
      >
        <Text
          fontFamily="body"
          fontSize={getFontSize(10)}
          fontWeight="400"
          color="#2A363D"
        >{review.text}</Text>
      </Box>
    : null}
    </Box>
  );
}

export default ReviewCardModal;