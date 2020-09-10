import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: 50,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    // color: "white",
    fontSize: 15,
    fontFamily: "SFProText-Bold",
    textAlign: "center",
  },
});

interface ButtonProps {
  variant: "default" | "primary";
  label: string;
  onPress: () => void;
}

const Button = ({ variant, label, onPress }: ButtonProps) => {
  const backgroundColor = variant === "primary" ? "#2CB9B0" : "rgba(12, 13, 52, 0.05)";
  const color = variant === "primary" ? "white" : "#0C0D34";
  return (
    <RectButton
      style={[styles.container, { backgroundColor }]}
      {...{ onPress }}
    >
      <View>
        <Text style={[styles.label, { color }]}>{label}</Text>
      </View>
    </RectButton>
  );
};

Button.defaultProps = { variant: "default" };

export default Button;
