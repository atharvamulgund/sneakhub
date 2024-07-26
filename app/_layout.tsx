import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home/index"
        options={{
          headerShown: true,
          title: "SneakHub",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="home/sneaker/[id]"
        options={{
          headerShown: true,
          title: "Sneaker Details",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
