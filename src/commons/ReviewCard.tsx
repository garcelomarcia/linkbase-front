import React, { useState } from "react";
import { PixelRatio } from "react-native";
import axios from "axios";
import { Box, HStack, Image, Text } from "native-base";
import { Review } from "../components/ProviderScreen";
import StarSvg from "../assets/svg/StarSvg";

type Props = { review: Review }
type ResponsiveFontSize = (size: number) => number;

const ReviewCard: React.FC<Props> = ({ review }) => {

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
      height={review.text ? "110" : "78"}
      alignSelf="center"
      alignItems="flex-start"
      borderWidth="2"
      borderRadius="15"
      borderColor="#EAE8E8"
    >
      <HStack height={review.text ? "65%" : "100%"}>
        <Box 
          flexDirection="row"
          width="50%"
          height="100%"
          px="3"
          alignItems="center"
          justifyContent="flex-start"
        >
          {checkImageURL(review.User.photoURL)}
          <Box px="4">
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
          <HStack alignItems="center">
            <StarSvg size={19} fill={review.stars >= 1 ? "#981D9A" : "#BAB1B1"}/>
            <StarSvg size={19} fill={review.stars >= 2 ? "#981D9A" : "#BAB1B1"}/>
            <StarSvg size={19} fill={review.stars >= 3 ? "#981D9A" : "#BAB1B1"}/>
            <StarSvg size={19} fill={review.stars >= 4 ? "#981D9A" : "#BAB1B1"}/>
            <StarSvg size={19} fill={review.stars === 5 ? "#981D9A" : "#BAB1B1"}/>
          </HStack>
        </Box>
      </HStack>
    {review.text ? 
      <Box 
        height="35%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        borderTopWidth="2"
        borderColor="#EAE8E8"
      >
        <Text
          fontFamily="body"
          fontSize={getFontSize(10)}
          fontWeight="400"
          color="#2A363D"
        >
        {review.text.length > 50 
          ? `${review.text.slice(0, 55).trim()}...`
          : review.text}
        </Text>
      </Box>
    : null}
    </Box>
  );
}

export default ReviewCard;