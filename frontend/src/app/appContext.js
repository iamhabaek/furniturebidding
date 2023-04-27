import React, { useState, useEffect, useContext, useReducer } from "react";
import routes from "./RootRoutes";
import "firebase/auth";
import { auth } from "./services/firebase/firebaseAuthService";
import {
  login,
  logout,
  signup,
  resetPassword,
  loginWithFacebook,
  loginWithGoogle,
} from "./services/AuthService";
import { getItem, setItem } from "./services/localStorageService";
import FurnitureReducer from "./reducers/reducers/FurnitureReducer";
import { initialState } from "./reducers/reducers/FurnitureReducer";
import {
  getBiddings,
  getOrders,
  getProducts,
  getUsers,
} from "./reducers/actions/FurnitureActions";
const AppContext = React.createContext({});
export function useAuth() {
  return useContext(AppContext);
}
export function AppProvider({ children }) {
  const [user, setUser] = useState(null || getItem("user"));
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(FurnitureReducer, initialState);

  useEffect(() => {
    getProducts()(dispatch);
    getBiddings()(dispatch);
    getUsers()(dispatch);
    getOrders()(dispatch);
  }, []);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setItem("user", user);
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe;
  });
  console.log(state);
  const value = {
    products: state.products,
    biddings: state.biddings,
    users: state.users,
    orders: state.orders,
    dispatch,
    user,
    resetPassword,
    setUser,
    routes,
    signup,
    login,
    logout,
    loginWithGoogle,
    loginWithFacebook,
  };
  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
}

export default AppContext;
