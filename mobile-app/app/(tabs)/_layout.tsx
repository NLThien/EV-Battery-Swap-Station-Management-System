import { Tabs, useSegments } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { VAR } from "@/constants/varriable";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const HiddenTabsRouter = [
    ["(tabs)", "(profile)", "profileUser", "[id]"],
    ["(tabs)", "(profile)", "profileUser", "editUser"],
    ["(tabs)", "(profile)", "profileUser"],
    ["(tabs)", "(profile)", "feedback"],
    ["(tabs)", "(profile)", "feedback", "[id]"],
    ["(tabs)", "(profile)", "feedback", "createFeedback"],
  ];

  //kiêm tra xem tab có nên ẩn hay không
  const segments = useSegments();
  const shouldHideTabBar = HiddenTabsRouter.some(
    (hiddenRoute) => JSON.stringify(hiddenRoute) === JSON.stringify(segments)
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: VAR.PRIMARY_COLOR,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          display: shouldHideTabBar ? "none" : "flex",
          marginBottom: 10,
          position: "absolute",
          height: 80,
          borderWidth: 1,
          borderRadius: 999,
          backgroundColor: VAR.CARD_COLOR,
          elevation: 4, // Android shadow
          // iOS shadow
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          paddingTop: 10,
          marginHorizontal: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Setting",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gearshape.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
