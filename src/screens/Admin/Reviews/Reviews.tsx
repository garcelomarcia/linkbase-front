import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Center,
  Image,
  ArrowBackIcon,
} from "native-base";
import { ReviewsAdminProps } from "../../../../App";
import { Alert, TouchableOpacity, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

//colors
import COLORS from "../../../styles/theme";

import { ScrollView } from "react-native-gesture-handler";
import {
  EditSvgAdmin,
  TrashIcon2,
} from "../../../assets/svgImages/Admin/Intro";
import FiltroPositivos from "./FiltroPositivos/Filtro";
import { Route, useRoute } from "@react-navigation/native";
import axios from "axios";

interface ProviderReviews {
  id: number;
  UserId: number;
  createdAt: string;
  text: string;
  stars: number;
}

interface UserReviews {
  id: number;
  fullName: string;
  photoURL: string;
}

interface ProviderInfo {
  id: number;
  name: string;
}

const ReviewsAdmin: React.FC<ReviewsAdminProps> = ({ navigation }) => {
  const { params } =
    useRoute<Route<"Reviews Admin", { proveedorId: number }>>();
  const proveedorIdSelected = params.proveedorId;

  const [providerReviews, setProviderReviews] = useState<ProviderReviews[]>([]);
  const [userReviews, setUserReviews] = useState<UserReviews[]>([]);

  const [hasReviews, setHasReviews] = useState(false);

  const [providerInfo, setProviderInfo] = useState<ProviderInfo>({
    id: 0,
    name: "",
  });

  //console.log("USERSREVIEWLEGAGAGAA", userReviews);

  //console.log("PROVIDERS REVIEW FINAL", providerReviews);

  useEffect(() => {
    if (proveedorIdSelected) {
      axios
        .get(
          `${process.env.IP_ADDRESS}/reviews/providerReviews/${proveedorIdSelected}`
        )
        .then((response) => {
          setProviderReviews(response.data.reviews);
          if (response.data.reviews.length > 0) {
            setHasReviews(true);
          }

          response.data.reviews.forEach((review: { UserId: number }) => {
            const userId = review.UserId;
            axios
              .get(`${process.env.IP_ADDRESS}/users/${userId}`)
              .then((userResponse) => {
                setUserReviews((prevReviews) => [
                  ...prevReviews,
                  userResponse.data,
                ]);
              })
              .catch((error) => {
                console.log(error);
              });
          });

          axios
            .get(
              `${process.env.IP_ADDRESS}/reviews/providerReviews/${proveedorIdSelected}`
            )
            .then((userResponse) => {
              setProviderInfo(userResponse.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [proveedorIdSelected]); // Agregamos providerReviews como dependencia de useEffect

  // Genera íconos de estrella
  const generarIconosEstrella = (num: number): JSX.Element[] => {
    const iconos = [];
    for (let i = 0; i < 5; i++) {
      const icono = i < num ? "star" : "star-o";
      const color = COLORS.COLORS.WHITE;
      const backgroundColor = i < num ? COLORS.COLORS.LINKBASECOLOR : "gray";

      iconos.push(
        <View
          key={i}
          style={{
            borderColor: "white",
            backgroundColor,
            padding: 3,
            height: "80%",
            borderRadius: 5,
          }}
        >
          <FontAwesome name={icono} color={color} />
        </View>
      );
    }
    return iconos;
  };

  //eliminar reviews por reviewId
  const handleDeleteReview = (reviewId: number) => {
    Alert.alert(
      "¿Estás seguro de que deseas eliminar esta reseña?",
      "Esto eliminará permanentemente la reseña.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            axios
              .delete(`${process.env.IP_ADDRESS}/reviews/${reviewId}`)
              .then(() => {
                //Alert.alert("Se eliminó la reseña.");
                setProviderReviews((prevReviews) =>
                  prevReviews.filter((r) => r.id !== reviewId)
                );
              })
              .catch((error) => {
                console.log(error);
                Alert.alert("No se pudo eliminar la reseña.");
              });
          },
        },
      ]
    );
  };

  return (
    <Box
      safeArea
      display="flex"
      flex="1"
      justifyContent="flex-start"
      bgColor="white"
    >
      <Box>
        <Box px={0.05} pt="10" pb="3" flexDirection="row" alignItems="center">
          <TouchableOpacity onPress={() => navigation.navigate("Home Admin")}>
            <ArrowBackIcon
              size="6"
              color="#464444"
              style={{ marginLeft: "25%" }}
            />
          </TouchableOpacity>
          <Center>
            <Text
              mx={0.2}
              fontFamily="body"
              fontSize="4xl"
              fontWeight="700"
              color={COLORS.COLORS.BLACK}
            >
              Reseñas
            </Text>
          </Center>
          <TouchableOpacity onPress={() => navigation.navigate("Intro")}>
            <Ionicons
              name="person-circle-outline"
              size={24}
              color={COLORS.COLORS.LINKBASECOLOR}
              style={{ marginLeft: "20%" }}
            />
          </TouchableOpacity>
        </Box>
        <VStack space={2} alignItems="center">
          <Text px="16" fontFamily="body" fontWeight="400" textAlign="center">
            Ve y administra reseñas de {providerInfo.name}
          </Text>
        </VStack>
        <Center>
          <HStack space={2} alignItems="center" px={4} py={2}>
            <Box width={100}>
              <FiltroPositivos />
            </Box>
          </HStack>
        </Center>
      </Box>
      <ScrollView>
        {providerReviews.length > 0 ? (
          providerReviews.map((review) => {
            //console.log("REVIEW", review);
            //console.log("PROVIDER", provider);

            const user = userReviews.find((user) => user.id === review.UserId);

            if (user) {
              return (
                <Box
                  key={review.id}
                  bg="#ffffff"
                  shadow={2}
                  borderRadius={20}
                  m={5}
                  position="relative"
                >
                  <Image
                    key={user.id}
                    alt={user.fullName}
                    marginTop={10}
                    marginLeft={5}
                    source={{ uri: user.photoURL }}
                    height={36}
                    width={45}
                    resizeMode="contain"
                    marginBottom={4}
                  />
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="65%"
                    width="100%"
                    marginRight="58%"
                    borderRadius={20}
                  >
                    <View style={{ display: "flex" }}>
                      <Text
                        fontFamily={COLORS.FONTS.OUTFITBOLD}
                        fontWeight="700"
                        fontSize={12}
                        color="#000000"
                      >
                        {user.fullName}
                      </Text>
                    </View>
                  </Box>
                  <Box
                    position="absolute"
                    top={3}
                    left={0}
                    right={0}
                    bottom={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="75%"
                    width="100%"
                    borderRadius={20}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "-9%",
                      }}
                    >
                      {generarIconosEstrella(review.stars)}

                      <Text
                        style={{
                          color: "black",
                          marginLeft: "3%",
                          marginBottom: 1,
                        }}
                      >
                        {review.createdAt.slice(0, 10)}
                      </Text>
                    </View>
                  </Box>
                  {/* <TouchableOpacity
                    onPress={() => {
                      // Lógica para eliminar la imagen aquí
                    }}
                    style={{
                      position: "absolute",
                      top: 12,
                      right: "10%",
                      height: "15%",
                      width: "8%",
                      borderRadius: 5,
                      padding: 4,
                    }}
                  >
                    <EditSvgAdmin />
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => {
                      handleDeleteReview(review.id);
                    }}
                    style={{
                      position: "absolute",
                      top: 12,
                      right: "2%",
                      height: "15%",
                      width: "8%",
                      borderRadius: 5,
                      padding: 4,
                    }}
                  >
                    <TrashIcon2 />
                  </TouchableOpacity>
                  <Center>
                    <View
                      style={{
                        width: "90%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingBottom: "5%",
                      }}
                    >
                      <Text>{review.text}</Text>
                    </View>
                  </Center>
                </Box>
              );
            }
          })
        ) : (
          <Center>
            <Text>No hay reseñas 🤯 </Text>
          </Center>
        )}
      </ScrollView>
    </Box>
  );
};

export default ReviewsAdmin;
