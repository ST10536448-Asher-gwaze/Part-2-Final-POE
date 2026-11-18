import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AppButton from '../components/AppButton';
import { useMenu } from '../context/MenuContext';
import { COURSES } from '../constants/courses';
import { COLORS } from '../constants/theme';

export default function AddMenuItemScreen({ navigation }) {
  const { addMenuItem } = useMenu();

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!dishName.trim()) newErrors.dishName = 'Dish name is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    if (!course) newErrors.course = 'Please select a course.';

    const priceValue = Number(price.replace(',', '.'));
    if (!price.trim()) {
      newErrors.price = 'Price is required.';
    } else if (!isFinite(priceValue) || priceValue <= 0) {
      newErrors.price = 'Enter a valid price greater than 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const newItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price.replace(',', '.')),
    };

    addMenuItem(newItem);
    resetForm();
    Alert.alert('Success', `"${newItem.dishName}" was added to the menu.`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Add Menu Item</Text>

        <Text style={styles.label}>Dish Name</Text>
        <TextInput
          style={[styles.input, errors.dishName && styles.inputError]}
          placeholder="Enter dish name..."
          value={dishName}
          onChangeText={setDishName}
        />
        {errors.dishName && <Text style={styles.errorText}>{errors.dishName}</Text>}

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multiline, errors.description && styles.inputError]}
          placeholder="Enter description..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

        <Text style={styles.label}>Course</Text>
        <View style={[styles.pickerWrapper, errors.course && styles.inputError]}>
          <Picker selectedValue={course} onValueChange={(value) => setCourse(value)}>
            <Picker.Item label="Select a course..." value="" />
            {COURSES.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>
        {errors.course && <Text style={styles.errorText}>{errors.course}</Text>}

        <Text style={styles.label}>Price (R)</Text>
        <TextInput
          style={[styles.input, errors.price && styles.inputError]}
          placeholder="0.00"
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
        />
        {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

        <AppButton title="Save Item" onPress={handleSave} />
        <AppButton
          title="View Menu"
          secondary
          onPress={() => navigation.navigate('MenuList')}
        />
        <AppButton
          title="Back to Home"
          secondary
          onPress={() => {
            resetForm();
            navigation.navigate('Home');
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  form: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  inputError: { borderColor: COLORS.error },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    marginTop: 4,
  },
});
