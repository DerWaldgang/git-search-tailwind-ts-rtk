import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import FavoritePages from "./pages/FavoritePages";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <>
    <Navigation/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorite" element={<FavoritePages />} />
      </Routes>
    </>
  );
};

export default App;
