import { configureStore } from "@reduxjs/toolkit";
// reducers imports
import { shoonyaApi } from "./services/shoonya.api";
// slices imports
import authReducer from "./slices/auth.slice";
import socketReducer from "./slices/socket.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
    [shoonyaApi.reducerPath]: shoonyaApi.reducer,
  },
  devTools: process.env.NODE_ENV == "development",
  middleware: (gDM) => {
    return gDM({
      serializableCheck: {
        ignoredActionPaths: ["payload.sendJsonMessage","payload.getWebSocket"],
        ignoredPaths: ["socket.methods.sendJsonMessage", "socket.methods.getWebSocket"],
      }
    }).concat(shoonyaApi.middleware)
  },  
});
