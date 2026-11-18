import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import { useMenu } from '../context/MenuContext';
import { COLORS } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  const { menuItems } = useMenu();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef's Menu Manager</Text>
      <Text style={styles.subtitle}>Manage your menu items</Text>
      <Text style={styles.count}>
        Items on the menu: {menuItems.length}
      </Text>

      <AppButton title="+ Add New Item" onPress={() => navigation.navigate('AddMenuItem')} />
      <AppButton
        title={`View Menu (${menuItems.length})`}
        secondary
        onPress={() => navigation.navigate('MenuList')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 12,
  },
  count: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 24,
  },
});
