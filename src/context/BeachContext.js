import React, { createContext, useState } from "react";
import { DestinationList as initialDestinations } from "../data/destination";

/**
 * BeachContext - Global State untuk menyimpan data pantai
 * BAB 7: State Management dengan Context API
 */
export const BeachContext = createContext();

export const BeachProvider = ({ children }) => {
  const [destinations, setDestinations] = useState(initialDestinations);

  // Fungsi untuk menambahkan pantai baru
  const addNewBeach = (newBeachData) => {
    setDestinations((prevDestinations) => [newBeachData, ...prevDestinations]);
  };

  return (
    <BeachContext.Provider value={{ destinations, addNewBeach }}>
      {children}
    </BeachContext.Provider>
  );
};
