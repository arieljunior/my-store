import { useEffect, useState } from "react";

export function useDebounce<Type>(value: Type, delay: number): Type {
  const [debouncedValue, setDebouncedValue] = useState<Type>(value);

  useEffect(() => {
    const idTime = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(idTime)
  }, [value, delay]);

  return debouncedValue;
}
