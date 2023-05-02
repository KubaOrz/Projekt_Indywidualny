import { useContext, useEffect, useState, useRef } from "react";
import { CartContext } from "../../../context/CartContext";
import { StyleSheet, Text, TouchableOpacity, Animated } from "react-native";

export default function CartButton() {
  const { cartState } = useContext(CartContext);
  const [showButton, setShowButton] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (cartState.products.length > 0) {
      setShowButton(true);

      Animated.sequence([
        Animated.timing(animatedValue, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.timing(animatedValue, { toValue: 0, duration: 100, useNativeDriver: true })
      ]).start();

    } else {
      setShowButton(false);
    }}, [cartState]);

    if (showButton) {
        return (
            <Animated.View
              style={[styles.container, { transform: [
                  {
                    translateY: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -10] // Podskakiwanie o 10 jednostek w górę
                    })
                  }
                ] }]}
            >
              <TouchableOpacity onPress={() => console.log('Pokaż koszyk!')}>
                <Text style={styles.cartButtonText}>Pokaż koszyk</Text>
                <Text style={styles.cartPriceText}>{cartState.totalPrice.toFixed(2)}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
    }
  }


const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#22E57D",
    borderRadius: 25,
    width: "25%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6
  },

  cartButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },

  cartPriceText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
});
