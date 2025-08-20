import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const found_value = localStorage.getItem(key);
      return found_value !== null ? JSON.parse(found_value) : initialValue;
    } catch (error) {
      console.error(`Unable to load ${key} from localStorage`);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Unable to set ${key} in localStorage`);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
