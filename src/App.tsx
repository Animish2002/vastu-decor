import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./LandingPage/Home";
import Gallery from "./LandingPage/Gallery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
