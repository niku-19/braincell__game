/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const PointContext = createContext(null);

const CalPointContextProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(90);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <PointContext.Provider
      value={{ points, setPoints, setTimer, timer, setIsPaused, isPaused }}
    >
      {children}
    </PointContext.Provider>
  );
};

export const usePointContext = () => useContext(PointContext);
export default CalPointContextProvider;
