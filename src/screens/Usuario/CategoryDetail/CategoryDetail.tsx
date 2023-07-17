import React,{useState,useEffect} from "react";
import { View, TouchableOpacity, ScrollView, ActivityIndicator,TouchableWithoutFeedback } from "react-native";
import { ArrowLeftIcon,MapIcon } from "react-native-heroicons/outline";
import Filter from "./Filter"
import MapModal from "./MapModal";
import { Container, Category, CategoryText, Line, CardImage, CardTitle, CardText } from "./styles";
import { StarSvg } from "../../../assets/svgImages/Usuario/Home";
import { calculateDistance, parseDMS, calculateReview } from "../../../utils/utils";
import * as Location from 'expo-location';
import axios from "axios";
import MapView from "react-native-maps";
import { CategoryProps } from "../../../components/Navigators/HomeNavigator";


const rating = [
  { label: 'Calificación', value: '1' },
  { label: 'Distancia', value: '2' },
  { label: 'Interacciones', value: '3' },
];


const CategoryDetail: React.FC<CategoryDetailProps> = ({ navigation,route }) => {

  const [location, setLocation] = useState<{latitude:number, longitude:number}>({});
  const [proveedores, setProveedores] = useState<{id: number, title: string, image: string, review: number, latitude:number,longitude:number, distance: number, count: number}[]>([]);
  const [services, setServices] = useState<{label:string, value:string}[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAndRenderData = async () => {
      try {
        const myLocation = await fetchLocation();
        setLocation(myLocation);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchAndRenderData();
  }, []);
  
  useEffect(() => {
    const fetchDataAndServices = async () => {
      try {
        const data:any = await fetchData(route.params.serviceFilter, location);
        setProveedores(data);
  
        await fetchServices();        
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (location.latitude && location.longitude) {
      fetchDataAndServices();
    }
  }, [location]);
  const fetchLocation = async()=>{
    let { status } = await Location. requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Please grant location permissions");
      return;
    
    }
    let currentLocation:any = await Location.getCurrentPositionAsync({});    
    return currentLocation.coords
  }
    
    

  const fetchData = async (filter) => {
      try{
      const result = route.params.categoryName == "Todos" ? await axios.get(`${process.env.IP_ADDRESS}/providers`) : await axios.get(`${process.env.IP_ADDRESS}/providers/filterByCategorie/${route.params.categoryName}`);
      // const result = await axios.get(`${process.env.IP_ADDRESS}/providers/filterByCategorie/Profesionales`);
      const promises = result.data.map(async (provider: any) => {
        const lat: number = parseDMS(provider.latitude);
        const lon: number = parseDMS(provider.longitude);
        const reviewsRes: any = await axios.get(
          `${process.env.IP_ADDRESS}/reviews/providerReviews/${provider.id}`
        );
        return {
          id: provider.id,
          title: provider.name,
          image: provider.photoURL,
          review: calculateReview(reviewsRes.data.reviews),
          latitude:lat,
          longitude:lon,
          distance: calculateDistance(location.latitude, location.longitude, lat, lon),
          count: reviewsRes.data.reviews.length,
        };
      });        
      const data = await Promise.all(promises);
     try{
        const getByService:any = await axios.get(`${process.env.IP_ADDRESS}/providers/filterByService/${filter}`)
        const providersWithService = getByService.data.map((each:any)=>each.name)
        const filteredProviders = data.filter((proveedor:any)=>providersWithService.includes(proveedor.title))
        return filteredProviders
      }catch{return data}
    } catch (error: any) {
      console.log(error.message);
    } 
  };
  const fetchServices = async () => {
    try{
      const getServices:any = await axios.get(`${process.env.IP_ADDRESS}/services`)
      const allServices:any = getServices.data.map((service:any)=>{
        return{
          value:service.id.toString(),
          label: service.name
        }})
      allServices.unshift({value:"0", label:"borrar"})
      setServices(allServices)}
    catch (error:any){
      console.log(error.message)
    }
    };  

 
    const handleSort = (value:string)=>{
    
      if (value ==="1" || "0"){
        const sortedProveedores = proveedores.sort((a,b)=>b.review-a.review);
        setProveedores([...sortedProveedores])
      }
      if (value ==="2"){
        const sortedProveedores = proveedores.sort((a,b)=>a.distance-b.distance);
        setProveedores([...sortedProveedores])
      }
      if (value ==="3"){
        const sortedProveedores = proveedores.sort((a,b)=>b.count-a.count);
        setProveedores([...sortedProveedores])
      }
    }

    const handleFilter = async(value:string)=>{      
      if(value=="borrar" || value =="") {
        const res = await fetchData()
        setProveedores(res)
      }
      const res = await fetchData(value)
      setProveedores(res)
    }

    const handleNavigate = (name:string)=>{
      navigation.navigate("Provider", { name: name });
    }

   return (
    <Container>
      {isLoading ? (
        <ActivityIndicator />
      ): (<>
      <View style={{flexDirection:"row", width:"100%", justifyContent:"center", position:"relative", marginTop:89}}>
        <TouchableOpacity  style={{alignSelf:"flex-start", position:"absolute", left:32}} onPress={()=> navigation.goBack()}>
          <ArrowLeftIcon color ="black" size={30}/>
        </TouchableOpacity>
        <TouchableOpacity  style={{alignSelf:"flex-start", position:"absolute", right:32}} onPress={()=> modalVisible ? setModalVisible(false): setModalVisible(true)}>
          <MapIcon color={modalVisible ? "#a0279e" : "#000000"}size={30}/>
        </TouchableOpacity>  
      <Category>
        <CategoryText>{route.params.categoryName}</CategoryText>
      </Category>
      </View>
      <View style={{flexDirection:"row", width:"100%", justifyContent:"space-around", position:"relative", marginTop:20}}>
      <Filter data={services} search={true} placeholderName={"Sub-Categoría"}  handleSort={()=>{}} handleFilter={handleFilter}/>
      <Filter data={rating} search={false} placeholderName={"Ordenar por..."} handleSort={handleSort} handleFilter={()=>{}}/>
      </View>
      {!modalVisible ? (
         <ScrollView style={{width:"100%"}} contentContainerStyle={{alignItems:"center"}}>
         {proveedores ? proveedores.map((proveedor, i) => {
               return (<TouchableOpacity key={proveedor.id} onPress={()=>  navigation.navigate("Provider", { name: proveedor.title })}>
                 <CardImage source={{uri: proveedor.image}}/>
                 <CardTitle>{proveedor.title}</CardTitle>
                 <View style={{flexDirection:"row",alignSelf:"flex-start"}}>
                 <StarSvg/>
                 <CardText>{`${proveedor.review} (${proveedor.count} calificaciones) a ${proveedor.distance} km`}</CardText>
                 </View>              
                 <Line/>
                 </TouchableOpacity>
               );
             }):<></>}
             </ScrollView>
      ): (
      <MapModal origin={{latitude:location.latitude, longitude:location.longitude}} modalVisible={modalVisible} proveedores={proveedores} handleNavigate={handleNavigate}/>
      )}     
                  
          </>)}           
    </Container>    

  );
};

export default CategoryDetail;
