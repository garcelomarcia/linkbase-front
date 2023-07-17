import React, { useState,useEffect } from "react";
import { Alert, Text, TouchableOpacity,ActivityIndicator,Modal,View } from "react-native";
import { AddphotoSvg } from "../../../assets/svgImages/Usuario/Profile";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { Container, ProfilePic, EditText, EditInput, Button,ModalContainer,URLInput,URLSubmit } from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { User } from "../../../components/ProviderScreen";

type ProfileEditProps = {
  navigation: any; // o cualquier otro tipo de objeto de navegación que estés usando
};

const Edit: React.FC<ProfileEditProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const[email,setEmail] = useState('email@email.com')
  const[url,setUrl] = useState("")
  const [user, setUser] = useState<User>({} as User);
  const[isLoading,setIsLoading] = useState(true)
  const [modal,setModal] = useState(false)

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        const decodedToken:any = jwtDecode(value);
        const response = await axios.get(`${process.env.IP_ADDRESS}/users/${decodedToken.user.id}`);
        setUser(response.data)
        setEmail(response.data.email)
      }
    } catch (error) {
      console.error(error);
    }
    finally {setIsLoading(false)}
  };

  useEffect(() => {    
    getToken();
  }, []);

  const handleSubmit = async() => {
    const title = "Aviso";
    const message = "Tu cambio ha sido realizado con éxito";
    await axios.put(`${process.env.IP_ADDRESS}/users/${user.email}`, {email:email});
    Alert.alert(title, message, [
      {
        text: "OK",
        onPress: () => navigation.navigate("ProfileDetail"),
      },
    ]);
  };

  const handleProfileChange = async()=>{
    await axios.put(`${process.env.IP_ADDRESS}/users/${user.email}`, {photoURL:url});
    getToken()
    setModal(false)
  }

  if (isLoading) return <ActivityIndicator/>
  return (
    <ScrollView style={{backgroundColor: "white"}}>
      <Container
        style={{
          marginTop: 60,
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <TouchableOpacity
          style={{ alignSelf: "flex-start", position: "absolute", left: 32 }}
          onPress={() => navigation.navigate("ProfileDetail")}
        >
          <ArrowLeftIcon color="black" size={30} />
        </TouchableOpacity>
        <ProfilePic
          source={{
            uri: user.photoURL
              ? user.photoURL
              : "https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png",
          }}
          style={{ marginTop: 63 }}
        />
        <TouchableOpacity style={{ marginLeft: 126 }} onPress={()=>setModal(true)}>
          <AddphotoSvg />
        </TouchableOpacity>
          <Modal
       animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModal(!modal);
        }}
      > 
          <ModalContainer>
            <EditText style={{margin:20}}>URL: </EditText>
            <URLInput value={url} onChangeText={setUrl}/>
            <URLSubmit onPress={handleProfileChange}>
            <Text
            style={{
              fontFamily: "Outfit_700Bold",
              color: "#fff",
              fontSize: 9,
              alignSelf: "center",
            }}
          >
            Enviar
          </Text>
            </URLSubmit>
          </ModalContainer>          
         </Modal>        
        <EditText
          style={{ alignSelf: "flex-start", marginTop: 43, marginLeft: 62 }}
        >
          Editar Correo:
        </EditText>
        <EditInput autoCapitalize="none" value={email} onChangeText={setEmail}/>
        <Button onPress={handleSubmit}>
          <Text
            style={{
              fontFamily: "Outfit_700Bold",
              color: "#fff",
              fontSize: 17,
              alignSelf: "center",
              padding: 17,
            }}
          >
            Editar Perfil
          </Text>
        </Button>
      </Container>
    </ScrollView>
  );
};

export { Edit };
