import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  SectionList,
} from "react-native";
import axios from "axios";
import { Box, Pressable } from "native-base";
import { OverviewProps } from "../../../components/Navigators/HomeNavigator";
import Carousel from "./carousel/Carousel";
import {
  TextProveedor,
  Container,
  SearchBar,
  SearchIcon,
  ScrollViewCategory,
  ContainerCategory,
  ProveedorContainer,
  SearchContainer,
  SearchTitle,
  SearchItem,
} from "./styles";
import { View,ScrollView } from "react-native";


const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const CARD_WIDTH = width / 3 - 25; // espacio entre las tarjetas
const CARD_HEIGHT = height / 10; // espacio entre las tarjetas

type Category = {
  id: string;
  name: string;
  iconURL: any;
};

export type Provider = {
  name: string;
  id: number;
  email: string;
  phone: string;
  web: string;
  photoURL: string;
  isPending: boolean;
  time: string;
  address: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
};

type Services = {
  id: number;
  name: string;
};

type Results = {
  title: string;
  data: any[];
};

const Home: React.FC<OverviewProps> = ({ navigation }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Results[]>([]);

  const handleSearch = (text: string) => {
    if (text === "") return setSearchResults([]);
    const filteredServices = services.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    const listServices = filteredServices.map((item) => item.name);
    const filteredProviders = providers.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    const listProviders = filteredProviders.map((item) => item.name);
    const filter = [
      { title: "Proveedores", data: listProviders },
      { title: "Servicios", data: listServices },
    ];
    setQuery(text);
    setSearchResults(filter);
  };

  const handleNavigate = (title: string, item: string) => {
    if (title === "Proveedores") return navigation.navigate("Provider", { name: item });
    const filterId: number | undefined = services.find(service=>service.name===item)?.id
    navigation.navigate("CategoryDetail", {
      categoryName: "Todos",
      serviceFilter: filterId
    });
  };

  useEffect(() => {
    async function requestHomeData(): Promise<void> {
      try {
        const providersResponse = await axios.get(
          `${process.env.IP_ADDRESS}/providers`
        );
        const categoriesResponse = await axios.get(
          `${process.env.IP_ADDRESS}/categories`
        );
        const servicesResponse = await axios.get(
          `${process.env.IP_ADDRESS}/services`
        );

        setProviders(providersResponse.data);
        setCategories(categoriesResponse.data);
        setServices(servicesResponse.data);
      } catch (error: any) {
        console.error(error.response.data);
      }
    }
    requestHomeData();
  }, []);

  if (!providers.length && !categories.length) return null;

  return (
    <SafeAreaView>
        <Image
          style={{ height: 155, width: "100%" }}
          source={require("../../../assets/svgImages/Usuario/Home/imgs/slider1.png")}
          resizeMode="cover"
        />   
      <Container>
        <View>
        <View style={{flexDirection:"row", justifyContent:"space-between",position:"relative"}}>
        <SearchBar style={{ elevation: 3 }} onChangeText={handleSearch} />
        <SearchIcon style={{ elevation: 3 }} />  
        </View>      
        
        {searchResults.length === 0 ? (
          <></>
        ) : (
          <SearchContainer>
            <SectionList
              style={{ padding: 10, zIndex: 5 }}
              sections={searchResults}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item, section }) => (
                <TouchableOpacity
                  onPress={() => handleNavigate(section.title, item)}
                >
                  <SearchItem>{item}</SearchItem>
                </TouchableOpacity>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <SearchTitle style={{ marginTop: 10 }}>{title}</SearchTitle>
              )}
            />
          </SearchContainer>
        )}

        <ScrollView>
        <ContainerCategory style={{ height: 165, elevation: 4 }}>
         
            <Box alignSelf={"center"}>
              {categories.map((category, rowIndex) => (
                <View style={{ flexDirection: "row" }} key={rowIndex}>
                  {[0, 1, 2].map((colIndex) => {
                    const categoryIndex = rowIndex * 3 + colIndex;
                    if (!categories[categoryIndex]) {
                      return null;
                    }
                    const category = categories[categoryIndex];
                    return (
                      <TouchableOpacity
                        style={{
                          height: CARD_HEIGHT,
                          width: CARD_WIDTH,
                          borderRadius: 8,
                          backgroundColor: "#ffffff",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={() => {
                          navigation.navigate("CategoryDetail", {
                            categoryName: category.name,
                            serviceFilter: "",
                          });
                        }}
                        key={category.id}
                      >
                        <Image
                          source={{ uri: category.iconURL }}
                          style={{ width: "25%", height: "25%" }}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            textAlign: "center",
                            marginTop: 5,
                          }}
                        >
                          {category.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </Box>
        </ContainerCategory>
        <TextProveedor>Proveedores Destacados</TextProveedor>
        <ProveedorContainer
          style={{
            display: "flex",
            justifyContent: "center",
            height: "58%",
            width: "100%",
            elevation: 1,
          }}
        >
          <Carousel providers={providers} />
        </ProveedorContainer>
        </ScrollView>
        </View>
        
       
      </Container>
    </SafeAreaView>
  );
};

export default Home;
