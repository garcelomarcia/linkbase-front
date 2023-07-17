import React from 'react';
import { Text,View } from 'react-native';
import MapView, { Marker,Callout } from 'react-native-maps';
import { MapPinIcon } from "react-native-heroicons/solid";


const MapModal: React.FC = ({ origin,proveedores,handleNavigate }) => {    

    return(
            <MapView style={{width:"100%", height:"100%"}}>
              <Marker coordinate={origin}>
              <MapPinIcon color={"green"}/>
              </Marker>
             {proveedores.map((each:any,i)=>{
                return(
                    <Marker key={i}coordinate={{latitude:each.latitude, longitude:each.longitude}}>
                        <MapPinIcon color={"red"}/>
                        <Callout  style={{width:200,height:50}} onPress={()=>handleNavigate(each.title)}>
                            <View>
                            <Text style={{fontWeight:'bold'}}>{each.title}</Text>
                            <Text>{each.review}&#11088;</Text>
                            <Text>{each.distance}km</Text>
                            </View>                            
                        </Callout>
                    </Marker>
                )})
              }
            </MapView>
      )  
};


export default MapModal;
