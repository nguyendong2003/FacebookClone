import React from "react";
import Navigation from "./Navigation.js";
import { Provider as AuthProvider } from "./context/AuthContext.js";  
const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
