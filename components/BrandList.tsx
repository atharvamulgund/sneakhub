import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
const sneakerBrands = [
  "Nike",
  "Adidas",
  "Puma",
  "New Balance",
  "Reebok",
  "Asics",
  "Converse",
  "Vans",
  "Under Armour",
  "Fila",
];

interface componentsProp {
  onSelectCategory: (category: string) => void;
}

const BrandList = ({ onSelectCategory }: componentsProp) => {
  const animation = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: animation }],
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={sneakerBrands}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => onSelectCategory(item)}
            style={styles.item}
          >
            <Animated.View style={[styles.animatedItem, animatedStyle]}>
              <Text style={styles.text}>{item}</Text>
            </Animated.View>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default BrandList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  item: {
    marginHorizontal: 8,
  },
  animatedItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
  },
});
