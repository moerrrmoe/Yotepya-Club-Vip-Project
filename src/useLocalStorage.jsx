import { useState } from 'react';

// Custom hook to use localStorage with React
function useLocalStorage(key, initialValue) {
  // Get from localStorage then parse the JSON or use initialValue if not available
  const storedValue = localStorage.getItem(key);
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(parsedValue);

  // Update localStorage whenever value changes
  const setLocalStorageValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue)); // Store as string
  };

  return [value, setLocalStorageValue];
}

export default useLocalStorage;
