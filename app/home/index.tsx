import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "@/components/SearchBar";
import BrandList from "@/components/BrandList";
import { SneakerProps } from "@/constants/interface";

const SneakerCard: React.FC<SneakerProps> = ({ sneaker }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: sneaker?.image }} style={styles.image} />
      <Text style={styles.title}>{sneaker?.title}</Text>
      <Text style={styles.price}>
        ${sneaker?.base_price} {sneaker?.currency}
      </Text>
      <Text style={styles.sizesTitle}>Available Sizes:</Text>
      <View style={styles.sizesContainer}>
        {sneaker?.variants?.map((variant: any, index) => (
          <View key={index} style={styles.sizeChip}>
            <Text style={styles.sizeChipText}>{variant.size}</Text>
          </View>
        ))}
      </View>
      <Link href={`/home/sneaker/${sneaker.id}`} style={styles.link}>
        <Text style={styles.linkText}>View Details</Text>
      </Link>
    </View>
  );
};

const LandingPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  let url =
    "https://the-sneaker-database-api-your-ultimate-sneaker-encyclopedia.p.rapidapi.com/search?query=All%20Sneakers";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "18458c0a04msh10c0a0f99cd0268p1acdbejsn9ebc33d70081",
      "x-rapidapi-host":
        "the-sneaker-database-api-your-ultimate-sneaker-encyclopedia.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();
      setSearchResults(result.hits);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectedCategory = (category: string) => {
    handleSearch(category, "category");
    setSearch("");
  };

  const handleSearch = (item: string, type: string) => {
    type !== "search" ? setSearch("") : null;
    switch (type) {
      case "search":
        setSearch(item);
        url = `https://the-sneaker-database-api-your-ultimate-sneaker-encyclopedia.p.rapidapi.com/search?query=${search} Sneakers`;
        break;
      case "category":
        url = `https://the-sneaker-database-api-your-ultimate-sneaker-encyclopedia.p.rapidapi.com/search?query=All ${item} sneakers`;
        break;
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <BrandList onSelectCategory={handleSelectedCategory} />
      {isLoading ? (
        <ActivityIndicator color="red" size="large" />
      ) : (
        <>
          <FlatList
            data={searchResults}
            renderItem={({ item }) => <SneakerCard sneaker={item} />}
            keyExtractor={(item: any) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
          />
        </>
      )}
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingBottom: 16, // Add padding to the bottom to avoid cutting off the last item
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "flex-start",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#e60000",
    borderRadius: 5,
  },
  linkText: {
    color: "#e60000",
    fontSize: 16,
    fontWeight: "bold",
  },
  sizesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },

  sizesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  sizeChip: {
    backgroundColor: "#e60000",
    width: 40, // Adjust the size as needed
    height: 40, // Adjust the size as needed
    borderRadius: 20, // Half of the width and height
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  sizeChipText: {
    color: "#fff",
    fontSize: 14,
  },
});
