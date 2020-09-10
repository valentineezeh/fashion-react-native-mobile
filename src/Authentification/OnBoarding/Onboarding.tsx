import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, { multiply, divide } from "react-native-reanimated";
import {
  // useValue,
  // onScrollEvent,
  interpolateColor,
  useScrollHandler,
} from "react-native-redash";

import Slide, { SLIDE_HEIGHT } from "./Slider";
import Sunslide from "./Subslide";
import Dot from "./Dot";

const BORDER_RADIUS = 75;
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT, //0.61 * height,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    // backgroundColor: "rgba(100, 200, 300, 0.5)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // width,
  },
});

const slides = [
  {
    label: "Glamour",
    color: "#BFEAF5",
    text: "Find Your Outfits",
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    picture: require("../../../assets/image/woman1.png"),
  },
  {
    label: "Playful",
    color: "#BEECC4",
    text: "Hear it First, Wear it First",
    description:
      "Want the clothes in your wardrobe? Explore hundreds of outfit ideas",
    picture: require("../../../assets/image/woman2.png"),
  },
  {
    label: "Eccentric",
    color: "#FFE4DA",
    text: "Your Style, Your Way",
    description:
      "Create your individual & unique style and look amazing everyday",
    picture: require("../../../assets/image/woman3.png"),
  },
  {
    label: "Funky",
    color: "#FFDDDD",
    text: "Look Good, Feel Good",
    description:
      "Discover the latest trend in fashion and explore your personality",
    picture: require("../../../assets/image/woman4.png"),
  },
];

const Onboarding = () => {
  // const x = useValue(0);
  // const onScroll = onScrollEvent({ x });
  const scroll = useRef<Animated.ScrollView>(null);
  const { scrollHandler, x } = useScrollHandler();

  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, index) => index * width),
    //[0, width, width * 2, width * 3],
    outputRange: slides.map((slide) => slide.color),
  });

  return (
    <View style={styles.container}>
      {/* ------ Top Slider ------ */}
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          // scrollEventThrottle={1}
          {...scrollHandler}
        >
          {slides.map((slide, index) => (
            <Slide
              key={index}
              right={!!(index % 2)}
              label={slide.label}
              picture={slide.picture}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>

      {/* ------------- footer ---- */}
      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor,
          }}
        />
        <View style={styles.footerContent}>
          {/* onboarding pagination slides */}
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={divide(x, width)} {...{ index }} />
            ))}
          </View>

          {/* Footer Slider starts here */}
          <Animated.View
            style={{
              width: width * slides.length,
              flex: 1,
              flexDirection: "row",
              transform: [{ translateX: multiply(x, -1) }],
            }}
          >
            {/* Slide starts here */}
            {slides.map(({ text, description }, index) => (
              <Sunslide
                key={index}
                onPress={() => {
                  if (scroll.current) {
                    scroll.current
                      .getNode()
                      .scrollTo({ x: width * (index + 1), animated: true });
                  }
                }}
                last={index === slides.length - 1}
                {...{ text, description }}
              />
            ))}
          </Animated.View>
        </View>
      </View>
      {/* End of footer slider */}
    </View>
  );
};

export default Onboarding;
