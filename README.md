# Chef's Menu Manager

React Native (Expo) app that lets a chef add and view menu items
(dish name, description, course, price).

## Run it

```
npm install
npx expo install expo react react-native @react-native-picker/picker @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
npx expo start
```

Scan the QR code with Expo Go, or press `a` (Android emulator) / `w` (web).

## Project structure

```
App.js                      Navigation container + stack navigator
screens/
  HomeScreen.js             Home view (menu item count)
  AddMenuItemScreen.js      Form with validation
  MenuListScreen.js         FlatList of menu cards
components/
  AppButton.js              Reusable button
  MenuCard.js               Menu item card
context/MenuContext.js      Shared menu state (add item / read items)
constants/                  Colour scheme and course list
```

## Features
- Home, Add Menu Item and Menu List screens linked with React Navigation
- Text inputs, multiline description, course Picker ("Select a course..."), decimal keypad price
- Courses: Starter, Main Course, Dessert
- FlatList display of cards (name, R0.00 price, course, description)
- Item count on Home updates after each save
- Validation with a message under every field (price must be above 0),
  success alert, and an empty-menu message
