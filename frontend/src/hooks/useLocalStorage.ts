// import { useState,useEffect } from "react";

// export function useLocalStorage(key:string, property:string){
//     const [value, setValue] = useState<string>(()=>{
//         const getValue = localStorage.getItem(key);
//         if(getValue !=null){
//             return getValue;
//         }
//         return property;
//     });

//     const removeValue=()=>{
//         localStorage.removeItem(key);
//     }

//     useEffect(()=>{
//             localStorage.setItem(key,value);
//     },[value])

//     return[value,setValue,removeValue] as const

// }

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue; // Handle SSR

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage", error);
      return initialValue;
    }
  });

  const removeValue = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }, [key]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error setting localStorage", error);
      }
    }
  }, [key, value]);

  return [value, setValue, removeValue] as const;
}
