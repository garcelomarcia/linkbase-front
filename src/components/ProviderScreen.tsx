import React, { useEffect, useState } from "react";
import { ImageBackground, PixelRatio, Linking } from "react-native";
import axios, { AxiosResponse } from "axios";
import {
  Alert,
  ArrowBackIcon,
  Box,
  Button,
  Center,
  CloseIcon,
  Flex,
  HStack,
  IconButton,
  Modal,
  Pressable,
  ScrollView,
  ShareIcon,
  Skeleton,
  Text,
  TextArea,
  VStack,
} from "native-base";
import StarSvg from "../assets/svg/StarSvg";
import MapSvg from "../assets/svg/MapSvg";
import PageSvg from "../assets/svg/PageSvg";
import PhoneSvg from "../assets/svg/PhoneSvg";
import SimpleStarSvg from "../assets/svg/SimpleStarSvg";
import { ProviderProps } from "./Navigators/HomeNavigator";
import { Provider } from "../screens/Usuario/Home/Home";
import calculateReviewAverage from "../utils/calculateReviewAverage";
import ReviewGraphRow from "../commons/ReviewGraphRow";
import reviewsToGraph from "../utils/reviewsToGraph";
import { parseDMS } from "../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReviewCard from "../commons/ReviewCard";
import CreateReviewModal from "./CreateReviewModal";
import ViewReviewModal from "./ViewReviewModal";
import ProviderScreenSkeleton from "./ProviderScreenSkeleton";

type responsiveFontSize = (size: number) => number;
export type User = {
  fullName: string;
  id: number;
  email: string;
  password: string;
  salt: string;
  rol: string;
  charge: string;
  isPending: boolean;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
  CompanyId: number;
  ProviderId: null;
};
type ReviewBody = {
  review: {
    text: string;
    stars: number;
  };
  token: string;
  provider: {
    name: string;
  };
};
export type Review = {
  id: number;
  text: string;
  stars: number;
  createdAt: string;
  updatedAt: string;
  ProviderId: number;
  UserId: number;
  User: User;
};

const ProviderScreen: React.FC<ProviderProps> = ({ navigation, route }) => {
  const [token, setToken] = useState<string>("");
  const [provider, setProvider] = useState<Provider>({} as Provider);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 0,
      text: "",
      stars: 0,
      createdAt: "",
      updatedAt: "",
      ProviderId: 0,
      UserId: 0,
      User: {} as User,
    },
  ]);
  const [reviewAverage, setReviewAverage] = useState<number>(0);
  const [showWriteReview, setShowWriteReview] = useState<boolean>(false);
  const [showViewReview, setShowViewReview] = useState<boolean>(false);
  const [showPageAlert, setShowPageAlert] = useState<boolean>(false);
  const [newReviewText, setNewReviewText] = useState<string>("");
  const [starRating, setStarRating] = useState<number>(5);
  const [singleReview, setSingleReview] = useState<Review>({} as Review);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fontScale: number = PixelRatio.getFontScale();
  const getFontSize: responsiveFontSize = (size) => size / fontScale;

  useEffect(() => {
    async function requestProviderData(): Promise<void> {
      try {
        const token: string | null = await AsyncStorage.getItem("token");
        const providerResponse: AxiosResponse<Provider> = await axios.get(
          `${process.env.IP_ADDRESS}/providers/find/${route.params.name}`
        );
        const reviewResponse: AxiosResponse = await axios.get(
          `${process.env.IP_ADDRESS}/reviews/providerReviews/${providerResponse.data.id}`
        );
        const reviews = reviewResponse.data.reviews;
        if (token) setToken(token);
        setReviews(reviews);
        setReviewAverage(calculateReviewAverage(reviews));
        setProvider(providerResponse.data);
      } catch (error: any) {
        console.error(error.response.data);
      }
    }

    requestProviderData();
  }, []);

  const handleGetDirections = () => {
    const latitude = parseDMS(provider.latitude);
    const longitude = parseDMS(provider.longitude);
    const url = `https://maps.google.com/maps?origin=My_Location&daddr=${latitude},${longitude}`;

    Linking.openURL(url).catch((err) => {
      console.error("Failed to open Google Maps: ", err);
    });
  };

  const handleSubmitReview = async (): Promise<void> => {
    const reviewBody: ReviewBody = {
      review: {
        text: newReviewText,
        stars: starRating,
      },
      token: token,
      provider: {
        name: provider.name,
      },
    };
    try {
      setIsLoading(true);
      await axios.post(`${process.env.IP_ADDRESS}/reviews`, reviewBody);
      const { data }: AxiosResponse = await axios.get(
        `${process.env.IP_ADDRESS}/reviews/providerReviews/${provider.id}`
      );
      setNewReviewText("");
      setStarRating(5);
      setReviews(data.reviews);
      setReviewAverage(calculateReviewAverage(data.reviews));
      setIsLoading(false)
    } catch (error: any) {
      console.error(error.response.data);
    }
    setShowWriteReview(false);
  };

  if (!provider.name) return (<ProviderScreenSkeleton />);

  return (<>
    {/*Main Screen*/}
    <Box flex="1" bg="white">
      {/*Banner*/}
      <ImageBackground
        source={{ uri: `${provider.photoURL}` }}
        resizeMode="cover"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          bg="rgba(0, 0, 0, 0.6)"
        />
        <Box flex="2" flexBasis="199" alignItems="center">
          <Box width="320" height="auto" mt="12" justifyContent="flex-start">
            <Pressable onPress={() => navigation.goBack()}>
              <ArrowBackIcon size="6" color="white" />
            </Pressable>
          </Box>
          <Box width="320" height="auto" mt="6">
            <Text
              mb="1"
              fontFamily="body"
              fontSize={getFontSize(22)}
              fontWeight="700"
              color="white"
            >
              {provider.name}
            </Text>
            <HStack mt="1">
              {[...Array(5)].map((element, index) => (
                <StarSvg
                  key={index}
                  size={19}
                  fill={reviewAverage >= index + 1 ? "#981D9A" : "#BAB1B1"}
                />
              ))}
              <Text
                ml="2"
                fontFamily="body"
                fontSize="15"
                fontWeight="500"
                color="white"
              >
                {reviews.length}
              </Text>
            </HStack>
          </Box>
        </Box>
      </ImageBackground>
      {/*Header*/}
      <Box 
        flex="0.15" 
        width="320" 
        alignSelf="center" 
        justifyContent="center"
      >
        <Text
          alignSelf="center"
          fontFamily="body" 
          fontSize={getFontSize(16.2)}
          fontWeight="700" 
          color="black"
        >{provider.name}</Text>
      </Box>
      {/*Navbar*/}
      <Box
        flex="0.18"
        flexDirection="row"
        width="320"
        alignSelf="center"
        alignItems="center"
        justifyContent="space-evenly"
        borderWidth="2"
        borderRadius="15"
        borderColor="#EAE8E8"
      >
        {/*Reviews Button*/}
        <Box
          flexDirection="column"
          width="10"
          height="12"
          pt="1"
          alignItems="center"
          justifyContent="center"
        >
          <StarSvg size={25} fill="#981D9A" />
          <Text
            fontFamily="body"
            fontSize={getFontSize(12)}
            fontWeight="500"
            color="#981D9A"
          >
            Rating
          </Text>
        </Box>
        {/*Map Button*/}
        <Pressable
          flexDirection="column"
          width="10"
          height="12"
          pt="1"
          alignItems="center"
          justifyContent="center"
          onPress={handleGetDirections}
        >
          <MapSvg />
          <Text
            fontFamily="body"
            fontSize={getFontSize(12)}
            fontWeight="500"
            color="black"
          >
            Mapa
          </Text>
        </Pressable>
        {/*Page Button*/}
        <Pressable
          flexDirection="column"
          width="10"
          height="12"
          pt="1"
          alignItems="center"
          justifyContent="center"
          onPress={
            provider.web
              ? () => Linking.openURL(provider.web)
              : () => setShowPageAlert(true)
          }
        >
          <PageSvg />
          <Text
            fontFamily="body"
            fontSize={getFontSize(12)}
            fontWeight="500"
            color="black"
          >
            Página
          </Text>
          <Modal 
            isOpen={showPageAlert} 
            onClose={() => setShowPageAlert(false)}
          >
            <Modal.Content maxWidth="400">
              <Alert w="100%" status="error">
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <HStack space={2} flexShrink={1}>
                      <Alert.Icon mt="0.5" mx="2" />
                      <Text
                        fontSize={getFontSize(10)}
                        color="coolGray.800"
                        alignSelf="center"
                      >
                        Este proveedor no tiene página web.
                      </Text>
                    </HStack>
                    <IconButton
                      onPress={() => setShowPageAlert(false)}
                      variant="unstyled"
                      _focus={{ borderWidth: 0 }}
                      icon={<CloseIcon size="3" />}
                      _icon={{ color: "coolGray.600" }}
                    />
                  </HStack>
                </VStack>
              </Alert>
            </Modal.Content>
          </Modal>
        </Pressable>
        {/*Call Button*/}
        <Pressable
          flexDirection="column"
          width="10"
          height="12"
          pt="1"
          alignItems="center"
          justifyContent="center"
          onPress={() => Linking.openURL(`tel:${provider.phone}`)}
        >
          <PhoneSvg />
          <Text
            mt="1"
            fontFamily="body"
            fontSize={getFontSize(12)}
            fontWeight="500"
            color="black"
          >
            Llama
          </Text>
        </Pressable>
      </Box>
      {/*Review Section*/}
      <Box
        flex={reviews.length ? reviews.length !== 1 ? "0.61" : "0.54" : "0.26"}
        width="320"
        my="4"
        alignSelf="center"
      >
        <ScrollView>
          <Box flexDirection="row" mb="4" width="100%" height="auto">
            <VStack flex="3" space={1}>
              {reviewsToGraph(reviews)
                .reverse()
                .map((average, index, array) => (
                  <ReviewGraphRow
                    key={index}
                    stars={array.length - index}
                    average={average}
                  />
                ))}
            </VStack>
            <Center flex="1" pb="3">
              <Box flexDirection="row" alignItems="center">
                <Text fontSize="40" pr="2">
                  {reviewAverage}
                </Text>
                <SimpleStarSvg />
              </Box>
              <Text>
                {reviews.length} {reviews.length !== 1 ? "Reseñas" : "Reseña"}
              </Text>
            </Center>
          </Box>
          <VStack width="100%" height="auto" space={2}>
            {reviews.length
              ? reviews.map((review, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => {
                        setSingleReview(review);
                        setShowViewReview(true);
                      }}
                    >
                      <ReviewCard review={review} />
                    </Pressable>
                  )
                })
              : null}
          </VStack>
        </ScrollView>
      </Box>
      {/*Create Review Button*/}
      <Button
        flex="0"
        width="320"
        alignSelf="center"
        borderRadius="10"
        onPress={() => setShowWriteReview(true)}
        variant="outline"
        colorScheme="gray"
      >
        Escribe Tu Reseña
      </Button>
    </Box>
    {/*Modals*/}
    <CreateReviewModal
      isLoading={isLoading}
      setShowWriteReview={setShowWriteReview}
      showWriteReview={showWriteReview}
      setNewReviewText={setNewReviewText}
      newReviewText={newReviewText}
      setStarRating={setStarRating}
      starRating={starRating}
      handleSubmitReview={handleSubmitReview}
    />
  {singleReview.User
  ? <ViewReviewModal
      setShowViewReview={setShowViewReview}
      showViewReview={showViewReview}
      singleReview={singleReview}
    />
  : null}
  </>);
}

export default ProviderScreen;