import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"; // 👈 import Analytics

import Home from "./LandingPage/Home";
import Gallery from "./LandingPage/Gallery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Analytics /> 
    </BrowserRouter>
  );
}

export default App;
