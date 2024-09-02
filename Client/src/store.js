import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import authReducer from "./redux/modules/auth/authReducer";
import projectReducer from "./redux/modules/projects/projectReducer";
// import AsyncStorage from "@react-native-async-storage/async-storage";
const rootReducer = combineReducers({
    auth:authReducer,
    projects:projectReducer
})

export const store = configureStore({
    reducer: rootReducer,  
      middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: false,
          }),
  });