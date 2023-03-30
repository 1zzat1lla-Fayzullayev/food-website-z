import React from "react";
import Food from "./components/Food";
import "./sass/style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Food />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
