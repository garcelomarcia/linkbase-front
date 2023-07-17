import React, { useRef } from "react";
import {
  ScrollView,
  View,
  Animated,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Container,
  ScrollContainer,
  Card,
  IndicatorContainer,
  Title,
  StarContainer,
  StarText,
} from "./styles";
import { Provider } from "../Home";
import { StarSvg } from "../../../../assets/svgImages/Usuario/Home";

type Props = { providers: Provider[] };
type RootStackParamList = { Provider: { name: string } };

const Carousel: React.FC<Props> = ({ providers }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const renderDots = (index: number) => {
    const inputRange = [
      (index - 1) * windowWidth,
      index * windowWidth,
      (index + 1) * windowWidth,
    ];
    const dotWidth = scrollX.interpolate({
      inputRange,
      outputRange: [8, 9, 8],
      extrapolate: "clamp",
    });
    const dotColor = scrollX.interpolate({
      inputRange,
      outputRange: ["#C4C4C4", "#828282", "#C4C4C4"],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        key={index}
        style={{
          width: dotWidth,
          height: 8,
          borderRadius: 4,
          backgroundColor: dotColor,
          marginHorizontal: 4,
        }}
      />
    );
  };

  const providersToShow = providers.slice(0, 3);

  return (
    <Container>
      <ScrollContainer>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={1}
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal: (windowWidth - 420) / 2, // 280 is the width of the card
          }}
        >
          {providersToShow.map((provider) => (
            <Pressable
              key={provider.id}
              onPress={() => {
                navigation.navigate("Provider", { name: provider.name });
              }}
            >
              <View
                key={provider.id}
                style={{
                  width: windowWidth - 20,
                  height: 200,
                  marginHorizontal: 5,
                  paddingRight: 15
                }}
              >
                <Card
                  key={provider.id}
                  source={{ uri: provider.photoURL }}
                  style={{ elevation: 3 }}
                ></Card>
                <View style={{ paddingLeft: 15, marginTop: 5 }}>
                  <Title>{provider.name}</Title>
                  <StarContainer>
                    <StarSvg />
                    <StarText>4.5 - 20 reseñas</StarText>
                  </StarContainer>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <IndicatorContainer>
          {providersToShow.map((provider, index) => renderDots(index))}
        </IndicatorContainer>
      </ScrollContainer>
    </Container>
  );
};

export default Carousel;
