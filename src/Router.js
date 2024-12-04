import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Plus from "./pages/games/plus/Plus";
import Minus from "./pages/games/minus/Minus";
import Multiple from "./pages/games/multiple/Multiple";
import Division from "./pages/games/division/Division";
import Result from "./pages/result/Result";
import Header from "./components/Header";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plus" element={<Plus />} />
        <Route path="/minus" element={<Minus />} />
        <Route path="/multiple" element={<Multiple />} />
        <Route path="/division" element={<Division />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
