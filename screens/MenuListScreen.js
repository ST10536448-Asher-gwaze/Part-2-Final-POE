import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import MenuCard from '../components/MenuCard';
import { useMenu } from '../context/MenuContext';
import { COLORS } from '../constants/theme';

export default function MenuListScreen({ navigation }) {
  const { menuItems } = useMenu();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu List</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuCard item={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No menu items have been added yet.{'\n'}Tap "Add New Item" to get started.
          </Text>
        }
      />

      <AppButton title="+ Add New Item" onPress={() => navigation.navigate('AddMenuItem')} />
      <AppButton title="Back to Home" secondary onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  listContent: { flexGrow: 1 },
  emptyText: {
    fontSize: 18,
    color: COLORS.secondary,
    textAlign: 'center',
    marginTop: 40,
  },
});
