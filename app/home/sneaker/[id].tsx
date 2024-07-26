import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SneakerData } from "@/constants/interface";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "18458c0a04msh10c0a0f99cd0268p1acdbejsn9ebc33d70081",
    "x-rapidapi-host":
      "the-sneaker-database-api-your-ultimate-sneaker-encyclopedia.p.rapidapi.com",
  },
};

const SneakerDetails = () => {
  const { id } = useLocalSearchParams();
  const [sneakerData, setSneakerData] = useState<SneakerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const url = `https://the-sneaker-database-api-your-ultimate-sneaker-encyclopedia.p.rapidapi.com/product/${id}`;
      setIsLoading(true);
      const response = await fetch(url, options);
      const result: SneakerData = await response.json();
      setSneakerData(result);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!sneakerData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No data available</Text>
      </View>
    );
  }
  const cleanedDescription = sneakerData.description
    ? sneakerData.description.replace(/<br\s*\/?>/gi, " ")
    : "No description available.";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: sneakerData.image }} style={styles.image} />
        <Text style={styles.title}>{sneakerData.title}</Text>
        <Text style={styles.brand}>Brand: {sneakerData.brand}</Text>
        <Text style={styles.gender}>Gender: {sneakerData.gender}</Text>
        <Text style={styles.price}>
          Price: ${sneakerData.base_price} {sneakerData.currency}
        </Text>
        <Text style={styles.ageGroup}>Age Group: {sneakerData.age_group}</Text>
        <Text style={styles.description}>{cleanedDescription}</Text>
        <Text style={styles.gtin}>GTIN: {sneakerData.gtin}</Text>
        <View style={styles.labelsContainer}>
          {sneakerData.labels.map((label, index) => (
            <Text key={index} style={styles.label}>
              {label}
            </Text>
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(sneakerData.link)}
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SneakerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  brand: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  category: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  gender: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    color: "#e60000",
    marginBottom: 10,
    fontWeight: "bold",
  },
  ageGroup: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  gtin: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  labelsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  label: {
    backgroundColor: "#BE013c",
    borderRadius: 20,
    padding: 10,
    margin: 5,
    fontSize: 14,
    color: "#fff",
  },
  button: {
    backgroundColor: "#BE013c",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
