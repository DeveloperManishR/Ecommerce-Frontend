import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store";
import { ThemeProvider } from "@material-tailwind/react";
import {SocketProvider} from "./config/SocketContext.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        
      <ThemeProvider>
    <SocketProvider> 
        <App />
        </SocketProvider>
      </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
