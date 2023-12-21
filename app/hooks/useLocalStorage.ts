import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // This Hook is generic, meaning it can work with different types of data. The generic type T represents the type of data that will be stored in localStorage.
  const [value, setValue] = useState<T>(() => {
    // The useState hook is used to manage the local state. It initializes value and setValue with the initial value retrieved from localStorage. If the value doesn't exist in localStorage, it uses the provided initialValue. If initialValue is a function, it calls that function to get the initial value.
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === 'function') {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  // The useEffect hook is used to update the localStorage whenever the value or key changes. It serializes the value to JSON and stores it in localStorage under the specified key.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  //The Hook returns an array with the current value (value) and the function to update that value (setValue). The returned array has a specific type, [typeof value, typeof setValue], ensuring TypeScript can correctly infer the types.

  return [value, setValue] as [typeof value, typeof setValue];
}
