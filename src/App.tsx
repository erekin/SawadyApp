import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

// Firebase設定
import './firebase/firebaseConfig';

// スクリーン
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import QrScanScreen from './screens/QrScanScreen';
import VisitorsScreen from './screens/VisitorsScreen';
import FriendsScreen from './screens/FriendsScreen';
import PointsScreen from './screens/PointsScreen';

// 型定義
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  QrScan: undefined;
  Visitors: undefined;
  Friends: undefined;
  Points: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// 認証前のナビゲーション
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

// メインのタブナビゲーション
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'QrScan') {
            iconName = focused ? 'qr-code' : 'qr-code-outline';
          } else if (route.name === 'Visitors') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Friends') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Points') {
            iconName = focused ? 'star' : 'star-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'ホーム' }}
      />
      <Tab.Screen 
        name="QrScan" 
        component={QrScanScreen} 
        options={{ title: 'QRスキャン' }}
      />
      <Tab.Screen 
        name="Visitors" 
        component={VisitorsScreen} 
        options={{ title: '来店者' }}
      />
      <Tab.Screen 
        name="Friends" 
        component={FriendsScreen} 
        options={{ title: 'ともだち' }}
      />
      <Tab.Screen 
        name="Points" 
        component={PointsScreen} 
        options={{ title: 'ポイント' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // スプラッシュスクリーンを表示し続ける
        await SplashScreen.preventAutoHideAsync();
        
        // ここでFirebase認証状態の確認を行う
        // TODO: Firebase Authの状態確認を実装
        
        // 仮の認証状態（後でFirebase Authと連携）
        setIsAuthenticated(false);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 