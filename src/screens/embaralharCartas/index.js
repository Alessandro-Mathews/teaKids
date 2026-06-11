import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
} from "react-native";
import { styles } from "./styles";

export default function EmbaralhandoCartas() {
  const rotacao = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotacao, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const girar = rotacao.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Embaralhando as cartas....
      </Text>

      <Animated.Text
        style={[
          styles.icone,
          {
            transform: [{ rotate: girar }],
          },
        ]}
      >
        🔄
      </Animated.Text>
    </View>
  );
}