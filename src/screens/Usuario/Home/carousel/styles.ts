import { ImageBackground } from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top:-60px;
`;

const ScrollContainer = styled.View`
  display: flex;
  margin-bottom: 80px;
  height: 250px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Card = styled(ImageBackground)`
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const IndicatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 17px;
  font-family: ${props => props.theme.FONTS.OUTFITBOLD};
`;

const StarContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StarText = styled.Text`
  font-size: 13px;
  margin-left: 2%;
  font-family: ${props => props.theme.FONTS.OUTFITLIGHT};
`;

export { 
  Container, 
  ScrollContainer, 
  Card, 
  IndicatorContainer, 
  Title, 
  StarContainer, 
  StarText 
}