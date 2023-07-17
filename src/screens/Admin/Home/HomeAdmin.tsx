import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  Icon,
  Input,
  HStack,
  Center,
  Button,
  Modal,
  CloseIcon,
  //Image,
} from "native-base";
import { Chip } from "react-native-paper";
import { HomeAdminProps } from "../../../../App";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

//colors
import COLORS from "../../../styles/theme";
import Filtro from "./FiltroRating/Filtro";
import { SearchIcon } from "../../Usuario/Home/styles";
import { ScrollView } from "react-native-gesture-handler";
import {
  TrashSvg,
  UsersAdminSvg,
  YelpAdminSvg,
} from "../../../assets/svgImages/Admin/Intro";

//importar axios
import axios from "axios";
import { Image } from "react-native";
import Geocoding from "react-native-geocoding";

import { debounce } from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";

import jwtDecode from "jwt-decode";
import { useIsFocused } from "@react-navigation/native";

interface Review {
  id: number;
  ProviderId: number;
  stars: number;
}

interface Proveedor {
  id: number;
  UserId: number;
  address: string;
  createdAt: string;
  email: string;
  isPending: boolean;
  latitude: string;
  longitude: string;
  name: string;
  phone: string;
  photoURL: string;
  time: string;
  updatedAt: string;
  web: string;
}

Geocoding.init(`${process.env.API_KEY_MAPS}`);

const HomeAdmin: React.FC<HomeAdminProps> = ({ navigation }) => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const [filtro, setFiltro] = useState<number>(0);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Estados para los valores del formulario del modal
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState<number>(0);
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState<number>(0);
  const [phone, setPhone] = useState("");
  const [web, setWeb] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [newService, setNewService] = useState("");

  const [newCategory, setNewCategory] = useState("");

  const [services, setServices] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(0);

  const [decodedEmail, setDecodedEmail] = useState<string>("");

  // console.log("ADDRESS", address);

  //console.log("LATITUD", latitude);
  //console.log("LONGITUD", longitude);

  const [isAddressNotFound, setIsAddressNotFound] = useState(false);

  const handleGeocode = debounce((address: string) => {
    Geocoding.from(address)
      .then((response) => {
        const { status, results } = response;

        if (status === "OK") {
          const { lat, lng } = results[0].geometry.location;
          setLatitude(lat);
          setLongitude(lng);
          setIsAddressNotFound(false);
        } else if (status === "ZERO_RESULTS") {
          setIsAddressNotFound(true);
        }
      })
      .catch((error) => {
        if (error.origin.status === "ZERO_RESULTS") {
          setIsAddressNotFound(true);
        }
      });
  }, 1000); // El segundo parámetro es el tiempo de espera en milisegundos

  const addService = (service: string) => {
    if (service.trim()) {
      setServices([...services, service.trim()]);
      setNewService("");
    } else {
      Alert.alert("Ingrese un servicio válido");
    }
  };

  //remover services

  const removeService = (index: number) => {
    setServices((services) => services.filter((_, i) => i !== index));
  };

  const addCategory = (category: string) => {
    if (category.trim()) {
      setCategories([...categories, category.trim()]);
      setNewCategory("");
    } else {
      Alert.alert("Ingrese una categoría válida");
    }
  };

  // Remover categorías
  const removeCategory = (index: number) => {
    setCategories((categories) => categories.filter((_, i) => i !== index));
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      axios
        .get(`${process.env.IP_ADDRESS}/providers`)
        .then((response) => {
          setProveedores(response.data);
          //console.log("PROVEEDORES", response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`${process.env.IP_ADDRESS}/reviews`)
        .then((response) => {
          setReviews(response.data);
          //console.log("REVIEWS", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isFocused]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const keyboardHeight = event.endCoordinates.height;
        setKeyboardVerticalOffset(keyboardHeight + 10);
        //console.log("SHOW");
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      (event) => {
        const keyboardHeight = event.endCoordinates.height;
        setKeyboardVerticalOffset(keyboardHeight - 150);
        //console.log("HIDDEN");
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  //sacar el promedio de las reviews
  const getPromedio = (proveedorId: number): number => {
    const providerReviews = reviews.filter(
      (review) => review.ProviderId === proveedorId
    );
    const starsSum = providerReviews.reduce(
      (acc, review) => acc + review.stars,
      0
    );
    return starsSum / providerReviews.length;
  };

  //sacar la cantidad de reviews
  const getCantidadReviews = (proveedorId: number): number => {
    const providerReviews = reviews.filter(
      (review) => review.ProviderId === proveedorId
    );
    return providerReviews.length;
  };

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

  //Filtrar los proveedores en función del valor de buqueda y rating, y ordenar por promedio de reviews
  const filteredProveedores = [...proveedores]
    .sort((a, b) => {
      if (filtro === 0) {
        return getPromedio(b.id) - getPromedio(a.id);
      } else {
        return getPromedio(a.id) - getPromedio(b.id);
      }
    })
    .filter((proveedor) => {
      // Filtro por nombre del proveedor
      const searchFilter = proveedor.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      // Filtro por rating del proveedor
      let ratingFilter = false;
      if (filtro === 0) {
        ratingFilter = true;
      } else {
        ratingFilter = getPromedio(proveedor.id) >= filtro;
      }

      // Retorna verdadero si ambos filtros son verdaderos
      return searchFilter && ratingFilter;
    });

  //filtrar por rating
  const filtrarPorRating = (rating: number) => {
    const nuevoFiltro = rating === filtro ? 0 : rating;
    setFiltro(nuevoFiltro);
  };

  const handleYelpIconPress = (proveedorId: number) => {
    navigation.navigate("Reviews Admin", { proveedorId });
    //navigation.navigate('Reseñas', { proveedorId });
  };

  //eliminar proveedor
  const handleDeleteProvider = (proveedorName: string) => {
    const providerToDelete = proveedores.find((p) => p.name === proveedorName);

    if (!providerToDelete) {
      console.log(
        `No se encontró ningún proveedor con el nombre ${proveedorName}`
      );
      return;
    }

    Alert.alert(
      "¿Estás seguro de que deseas eliminar este proveedor?",
      `Esto eliminará permanentemente el proveedor ${providerToDelete.name} y toda su información.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            axios
              .delete(
                `${process.env.IP_ADDRESS}/providers/${providerToDelete.id}`
              )
              .then(() => {
                setProveedores(
                  proveedores.filter((p) => p.id !== providerToDelete.id)
                );
                Alert.alert("Proveedor eliminado", "", [{ text: "OK" }], {
                  cancelable: false,
                });
              })
              .catch((error) => {
                console.log(error);
                Alert.alert("No se pudo eliminar el proveedor.");
              });
          },
        },
      ]
    );
  };

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const decodedToken: any = jwtDecode(value);
          setDecodedEmail(decodedToken.user.email);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getToken();
  }, []);

  // Función para enviar la solicitud POST al servidor cuando se envía el formulario
  const handleSubmit = () => {
    // Verificar si los campos están vacíos
    if (
      name === "" ||
      email === "" ||
      //latitude === 0 ||
      address === "" ||
      //longitude === 0 ||
      phone === "" ||
      web === "" ||
      photoURL === "" ||
      services.length === 0 ||
      categories.length === 0
    ) {
      // Mostrar alert indicando que los campos están vacíos
      Alert.alert(
        "Campos vacíos",
        "Por favor complete todos los campos antes de enviar el formulario."
      );
      return;
    }
    const newProvider = {
      provider: {
        name,
        email,
        latitude: `${latitude}° N`,
        address,
        longitude: `${longitude}° W`,
        phone,
        web,
        photoURL,
        isPending: false,
        time: new Date().toISOString(),
      },
      services,
      categories,
      user: {
        email: decodedEmail,
      },
    };
    //console.log("newProvider", newProvider);
    axios
      .post(`${process.env.IP_ADDRESS}/providers`, newProvider)
      .then((response) => {
        //console.log(response.data);
        setProveedores([...proveedores, response.data]);
        setIsOpen(false);
        setName("");
        setEmail("");
        setLatitude(0);
        setAddress("");
        setLongitude(0);
        setPhone("");
        setWeb("");
        setPhotoURL("");
        setServices([]);
        setCategories([]);
        Alert.alert(
          "Proveedor creado exitosamente",
          "",
          [
            {
              text: "OK",
            },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  interface IUser {
    id: number;
    name: string;
    email: string;
    rol: string;
    // Agrega aquí los campos necesarios del usuario
  }

  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        const decodedToken: any = jwtDecode(value);
        const response = await axios.get(
          `${process.env.IP_ADDRESS}/users/${decodedToken.user.id}`
        );
        const user = response.data as IUser;
        setUserInfo(user);
      }
    };

    fetchData();
  }, []);

  //console.log("USERDATA", userInfo);

  return (
    <Box
      safeArea
      display="flex"
      flex="1"
      justifyContent="flex-start"
      bgColor="white"
    >
      <Box>
        <Box px={0.05} pt="10" pb="6" flexDirection="row" alignItems="center">
          <Center>
            <Text
              mx={0.2}
              fontFamily="body"
              fontSize="4xl"
              fontWeight="700"
              color={COLORS.COLORS.BLACK}
              marginLeft="20%"
            >
              Proveedores
            </Text>
          </Center>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile Admin")}
          >
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
            Ve y administra los proveedores disponibles
          </Text>
        </VStack>
        <Center>
          <HStack space={2} alignItems="center" px={4} py={2}>
            <Box width={100}>
              <Filtro filtrarPorRating={filtrarPorRating} />
            </Box>
            <Box width={200}>
              <Input
                placeholder="Busca proveedores"
                fontFamily={COLORS.FONTS.OUTFITMEDIUM}
                variant="unstyled"
                py={0}
                px={0}
                shadow={1}
                borderRadius={15}
                height={10}
                color={COLORS.COLORS.BLACK}
                alignSelf="center"
                backgroundColor="#FFFFFF"
                placeholderTextColor={COLORS.COLORS.BLACK}
                InputLeftElement={
                  <Icon
                    as={<Ionicons name="search-outline" />}
                    size="md"
                    m={2}
                  />
                }
                onChangeText={setSearchValue}
                value={searchValue}
              />
            </Box>
          </HStack>
        </Center>
      </Box>
      <ScrollView>
        {filteredProveedores.length > 0 &&
          filteredProveedores.map((proveedor) => {
            //console.log("PROVEEDOREEEE", proveedor);
            return (
              <Box
                key={proveedor.id}
                bg="#ffffff"
                shadow={2}
                borderRadius={20}
                m={9}
                position="relative"
              >
                <Image
                  source={{ uri: proveedor.photoURL }}
                  alt={proveedor.name}
                  style={{ height: 103, width: "100%", marginBottom: 4 }}
                  borderRadius={20}
                  resizeMode="contain"
                />
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg="rgba(0, 0, 0, 0.6)"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height={103}
                  width="100%"
                  borderRadius={20}
                >
                  <Text
                    fontFamily={COLORS.FONTS.OUTFITBOLD}
                    fontWeight="700"
                    fontSize={18}
                    color="#FFFFFF"
                  >
                    {proveedor.name}
                  </Text>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    {generarIconosEstrella(getPromedio(proveedor.id))}
                    <Text style={{ color: "white", marginLeft: "2%" }}>
                      {getPromedio(proveedor.id)
                        ? getPromedio(proveedor.id)
                        : 0}
                      {" de (" + getCantidadReviews(proveedor.id) + " reviews)"}
                    </Text>
                  </View>
                </Box>
                {userInfo?.rol === "adminProviders" ||
                userInfo?.rol === "superAdmin" ? (
                  <TouchableOpacity
                    onPress={() => {
                      handleDeleteProvider(proveedor.name);
                      // Lógica para eliminar el proveedor aquí
                    }}
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      borderRadius: 20,
                      padding: 13,
                    }}
                  >
                    <TrashSvg />
                  </TouchableOpacity>
                ) : null}
                <Center>
                  <View
                    style={{
                      width: "70%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingBottom: "5%",
                    }}
                  >
                    <Text>Administrar</Text>

                    <View
                      style={{
                        borderLeftWidth: 2,
                        paddingLeft: 18,
                        borderColor: "rgba(0,0,0,0.1)",
                        height: "250%",
                        marginTop: "-8%",
                      }}
                    ></View>

                    {userInfo && userInfo.rol !== "adminProviders" && (
                      <TouchableOpacity
                        onPress={() => handleYelpIconPress(proveedor.id)}
                      >
                        <YelpAdminSvg />
                      </TouchableOpacity>
                    )}
                    {/* <TouchableOpacity
                      onPress={() =>
                        navigation.navigate({
                          name: "Employees",
                          params: { isAdmin: true },
                        })
                      }
                    >
                      <UsersAdminSvg />
                    </TouchableOpacity> */}
                  </View>
                </Center>
              </Box>
            );
          })}
      </ScrollView>

      {userInfo && userInfo.rol !== "adminReviews" && (
        <Button
          style={{
            backgroundColor: `${COLORS.COLORS.LINKBASECOLOR}`,
            borderRadius: 50,
            marginBottom: 20,
            marginLeft: 70,
            marginRight: 70,
            height: 60,
          }}
          onPress={() => setIsOpen(true)}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="add" size={24} color="white" />
            <Text style={{ color: "white", marginLeft: 8 }}>
              Registrar nuevo proveedor
            </Text>
          </View>
        </Button>
      )}
      {/* Modal */}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        animationPreset={"slide"}
      >
        <Modal.Content style={{ backgroundColor: "white" }}>
          <Modal.CloseButton />
          <Modal.Header style={{ backgroundColor: "white" }}>
            <Text
              textAlign={"center"}
              fontFamily={COLORS.FONTS.OUTFITMEDIUM}
              fontSize={17}
            >
              Registrar nuevo proveedor
            </Text>
          </Modal.Header>
          <ScrollView>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={keyboardVerticalOffset}
            >
              <Modal.Body>
                <VStack space={2} borderRadius={20}>
                  <Input
                    placeholder="Nombre"
                    fontSize={13}
                    borderRadius={20}
                    value={name}
                    onChangeText={setName}
                  />
                  <Input
                    placeholder="Correo electrónico"
                    fontSize={13}
                    borderRadius={20}
                    value={email}
                    onChangeText={setEmail}
                  />
                  {!isAddressNotFound ? (
                    <Text style={{ color: "green" }}>
                      La dirección se encontró en el mapa.
                    </Text>
                  ) : (
                    <Text style={{ color: "red" }}>
                      La dirección no se encontró en el mapa.
                    </Text>
                  )}
                  <Input
                    placeholder="Dirección y país"
                    fontSize={13}
                    borderRadius={20}
                    value={address}
                    onChangeText={(text) => {
                      setAddress(text);
                      handleGeocode(text);
                    }}
                  />
                  <Input
                    placeholder="Teléfono"
                    fontSize={13}
                    borderRadius={20}
                    value={phone}
                    onChangeText={setPhone}
                  />
                  <Input
                    placeholder="Web"
                    fontSize={13}
                    borderRadius={20}
                    value={web}
                    onChangeText={setWeb}
                  />
                  <Input
                    placeholder="Photo URL"
                    fontSize={13}
                    borderRadius={20}
                    value={photoURL}
                    onChangeText={setPhotoURL}
                  />
                </VStack>
                <VStack space={2} borderRadius={20}>
                  <Text fontSize={13} fontWeight="bold">
                    Servicios:
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {services.map((service, index) => (
                      <HStack key={index} style={{ marginRight: 10 }}>
                        <Chip
                          key={index}
                          style={{ marginRight: 10 }}
                          onPress={() => {}}
                        >
                          {service}
                        </Chip>
                        <Button
                          onPress={() => removeService(index)}
                          ml={-4}
                          bg="transparent"
                          _pressed={{ bg: "transparent" }}
                        >
                          <CloseIcon size="xs" color="red.500" />
                        </Button>
                      </HStack>
                    ))}
                  </ScrollView>
                  <Input
                    placeholder="Agregar servicio"
                    fontSize={13}
                    borderRadius={20}
                    value={newService}
                    onChangeText={setNewService}
                    onSubmitEditing={() => addService(newService)}
                  />
                  <Text fontSize={13} fontWeight="bold">
                    Categorías:
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {categories.map((category, index) => (
                      <HStack key={index} style={{ marginRight: 10 }}>
                        <Chip
                          key={index}
                          style={{ marginRight: 10 }}
                          onPress={() => {}}
                        >
                          {category}
                        </Chip>
                        <Button
                          onPress={() => removeCategory(index)}
                          ml={-4}
                          bg="transparent"
                          _pressed={{ bg: "transparent" }}
                        >
                          <CloseIcon size="xs" color="red.500" />
                        </Button>
                      </HStack>
                    ))}
                  </ScrollView>
                  <Input
                    placeholder="Agregar categoría"
                    fontSize={13}
                    borderRadius={20}
                    value={newCategory}
                    onChangeText={setNewCategory}
                    onSubmitEditing={() => addCategory(newCategory)}
                  />
                </VStack>
              </Modal.Body>
              <Modal.Footer
                style={{
                  backgroundColor: "white",
                  justifyContent: "center",
                }}
              >
                <Button
                  bg={COLORS.COLORS.LINKBASECOLOR}
                  borderRadius={20}
                  onPress={handleSubmit}
                >
                  Aceptar
                </Button>
              </Modal.Footer>
            </KeyboardAvoidingView>
          </ScrollView>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default HomeAdmin;
