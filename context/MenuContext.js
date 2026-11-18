import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext(null);

// Holds the menu items so every screen (Home count, Add form, Menu List)
// reads from and writes to the same place.
export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);

  const addMenuItem = (item) => {
    setMenuItems((prev) => [...prev, item]);
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used inside a MenuProvider');
  return ctx;
}
