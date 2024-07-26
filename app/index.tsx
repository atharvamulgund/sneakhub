import { View, Text, ImageBackground, Pressable } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
// @ts-ignore
import imageURl from "@/assets/images/homebg.jpeg";

const HomePage = () => {
  return (
    <ImageBackground
      source={imageURl}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <BlurView
        intensity={30}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#000",
            opacity: 0.8,
          }}
        >
          <Text
            style={{
              fontSize: 42,
              color: "white",
              fontWeight: 300,
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              fontSize: 42,
              color: "white",
              fontWeight: 900,
              letterSpacing: 2.5,
            }}
          >
            SneakerHub
          </Text>
          <Pressable
            style={{
              paddingVertical: 12,
              paddingHorizontal: 26,
              backgroundColor: "#BE013c",
            }}
          >
            <Link href="/home">
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                Start Exploring
              </Text>
            </Link>
          </Pressable>
        </View>
      </BlurView>
    </ImageBackground>
  );
};

export default HomePage;
