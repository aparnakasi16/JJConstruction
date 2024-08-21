import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import authReducer from "./redux/modules/auth/authReducer";
// import AsyncStorage from "@react-native-async-storage/async-storage";
const rootReducer = combineReducers({
    auth:authReducer
})

export const store = configureStore({
    reducer: rootReducer,  
      middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: false,
          }),
  });