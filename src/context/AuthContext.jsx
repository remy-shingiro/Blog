import { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Create a custom hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Mock logged-in user. Default is Manager.
  const [user, setUser] = useState({
    name: "Admin Manager",
    role: "MANAGER", // Roles: 'MANAGER' or 'MECHANIC'
  });

  // Helper function to switch roles for testing purposes
  const switchRole = (newRole) => {
    setUser({
      name: newRole === "MANAGER" ? "Admin Manager" : "John the Mechanic",
      role: newRole
    });
  };

  return (
    <AuthContext.Provider value={{ user, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};