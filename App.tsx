import "./global.css";
import React from 'react'
import Navigation from "./src/Navigations/Navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { queryClient } from "./src/services/queryClient";
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}

