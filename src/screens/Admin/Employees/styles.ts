import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { TrashSvg } from "../../../assets/svgImages/Usuario/Home";

export const Container = styled.View`
flex: 1;
justify-content: flex-start;
align-items: center;
background: #FFFFFF;

`;

export const Title = styled.Text`
    font-family: "Outfit_700Bold";
    font-size: 30px;
    color: #464444;
    margin-top:89px;
`;

export const Description = styled.Text`
font-family: "Outfit_300Light";
font-size: 13px;
width: 80%;
margin-top: 28px;
text-align: center;
`;

export const EmployeeSearch = styled.TextInput`
width: 302px;
height: 31px;
background: #FFFFFF;
box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.12);
border-radius: 15px;
font-family: "Outfit_500Medium";
font-size: 10px;
margin-top:21px;
margin-bottom:20px;
padding:8px;
color:#000000;
`;

export const SearchIcon = styled(Icon).attrs({
    name: "search-outline",
    size: 13,
    color: "black",
  })`
    position: absolute;
    right:20px;
    top:30px;
  `;
export const Trash = styled(TrashSvg).attrs({
})`
transform-origin: center;
`;

export const EmployeeContainer = styled.View`
width: 302px;
height: 72px;
background: #FFFFFF;
border: 1px solid #EAE8E8;
border-radius: 15px;
margin-bottom:10px;
position:relative;
`;
export const FullName = styled.Text`
    font-family: "Outfit_700Bold";
    font-size: 12px;
    color: #2B273C;
    margin: 16px 0 7px 20px;
`;
export const BusinessName = styled.Text`
    font-family: "Outfit_600SemiBold";
    font-size: 10px;
    color: #646464;
`;

export const Role = styled.Text`
    font-family: "OpenSans_300Light";
    font-size: 10px;
    color: #939393;
`;

export const Mail = styled.Text`
font-family: "Outfit_400Regular";
font-size: 9px;
color: #646464;
margin-left:20px;
`;
