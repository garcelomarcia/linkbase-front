import styled from "styled-components/native";

export const Container = styled.View`
flex: 1;
justify-content: flex-start;
align-items: center;
background: #FFFFFF;
`;

export const Category = styled.View`
box-sizing: border-box;
width: 135px;
height: 29px;  
background: #FFFFFF;
border: 1px solid #000000;
border-radius: 15px;
color: #000000;
flex-direction:row;
justify-content:center;
align-items:center;
`;

export const CategoryText = styled.Text`

font-family: "Outfit_500Medium";
font-size: 12px;
color: #000000;
`;

export const Filter = styled.Pressable`
box-sizing: border-box;
width: 120px;
height: 31px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
border-radius: 20px;
flex-direction:row;
justify-content:center;
align-items:center;
`;

export const Line = styled.View`s
width:100%;
height:1px;
background-color:#e0dddd;
margin-top:10px;
`;

export const CardImage = styled.Image`
width: 322px;
height: 155px;
border-radius: 20px;
margin-top:17px;
`;

export const CardTitle = styled.Text`
font-family: "Outfit_500Medium";
font-size: 15px;
color: #000000;
align-self:flex-start;
margin-top: 21px;
`;

export const CardText = styled.Text`

font-family: "Outfit_300Light";
font-size: 12px;
color: #000000;
margin-left:10px;
`;



// color: rgb(2, 122, 151);
// background: rgb(231, 242, 243);
// border-color: rgb(2, 122, 151) !important;

