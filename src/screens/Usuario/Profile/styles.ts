import styled from "styled-components/native";

export const Container = styled.View``;

export const ProfilePic = styled.Image`
  width: 126px;
  height: 128px;
  border-radius: 679px;
`;

export const Title = styled.Text`
  font-family: "Outfit_700Bold";
  font-size: 30px;
  color: #464444;
  margin-top: 27px;
`;

export const Description = styled.Text`
  font-family: "Outfit_300Light";
  font-size: 13px;
  text-align: center;
`;

export const EditText = styled.Text`
  font-family: "Outfit_700Bold";
  font-size: 15px;
  color: #464444;
`;

export const EditInput = styled.TextInput`
  width: 322px;
  height: 59px;
  font-family: "Outfit_500Medium";
  font-size: 15px;
  color: #666161;
  background: #f3f3f3;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  margin-bottom: 12px;
  padding: 20px;
`;

export const Button = styled.TouchableOpacity`
  width: 322px;
  height: 54px;
  background-color: #a0279e;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  margin-top: 30px;
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: #e0dddd;
  //margin-top: 53px;
`;

export const Option = styled.Text`
  font-family: "Outfit_500Medium";
  font-size: 15px;
  margin-left: 9px;
`;

export const Logout = styled.TouchableOpacity`
  width: 137px;
  height: 22px;
  background-color: #a0279e;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  margin-top: 40px;
  justify-content: center;
`;

export const ModalContainer = styled.View`
width:322px;
height:200px;
background-color: #ffffff;
box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.12);
border-radius: 15px;
justify-content: flex-start;
align-self:center;
margin:auto;
`;

export const URLInput = styled.TextInput`
  width: 256px;
  height: 59px;
  font-family: "Outfit_500Medium";
  font-size: 15px;
  color: #666161;
  background: #f3f3f3;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  margin-bottom: 12px;
  padding: 20px;
  align-self:center;
`;
export const URLSubmit = styled.TouchableOpacity`
  width: 137px;
  height: 22px;
  background-color: #a0279e;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  margin:20px;
  justify-content: center;
  align-self:flex-end;
`;