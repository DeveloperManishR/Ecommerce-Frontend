import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routing } from "./Routing";
import './index.css'
import toast, { Toaster } from "react-hot-toast";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routing  />
      <Toaster  position="bottom-center"/>
    </>
  );
}

export default App;
