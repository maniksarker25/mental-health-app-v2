import '../global.css';
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadPersistedAppState } from '@/store/slices/appSlice';
import { loadPersistedAuth } from '@/store/slices/authSlice';

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const isHydrated = useAppSelector((state) => state.app.isHydrated);
  const isAuthLoaded = useAppSelector((state) => state.auth.isAuthLoaded);

  useEffect(() => {
    dispatch(loadPersistedAppState());
    dispatch(loadPersistedAuth());
  }, [dispatch]);

  if (!isHydrated && !isAuthLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-canvas">
        <ActivityIndicator size="large" color="#2E5E52" />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppInitializer>
            <StatusBar style="dark" backgroundColor="#F5F6F2" />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#F5F6F2' },
                animation: 'fade_from_bottom',
              }}
            />
            <Toast />
          </AppInitializer>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
