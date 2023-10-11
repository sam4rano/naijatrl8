import {useState, createContext } from "react";

export const AppProviderContext = createContext(null);

const AppProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);

  return (
    <AppProviderContext value={{ isLogin, setLogin }}>
      {children}
    </AppProviderContext>
  );
};
export default AppProvider;
