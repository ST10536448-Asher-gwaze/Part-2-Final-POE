import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MenuProvider } from './context/MenuContext';
import HomeScreen from './screens/HomeScreen';
import AddMenuItemScreen from './screens/AddMenuItemScreen';
import MenuListScreen from './screens/MenuListScreen';
import { COLORS } from './constants/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: COLORS.background },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen
            name="AddMenuItem"
            component={AddMenuItemScreen}
            options={{ title: 'Add Menu Item' }}
          />
          <Stack.Screen
            name="MenuList"
            component={MenuListScreen}
            options={{ title: 'Menu List' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
