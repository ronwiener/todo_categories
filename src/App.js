import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Grocery from "./components/grocery/Grocery";
import Costco from "./components/costco/Costco";
import Todo from "./components/todo/Todo";
import Hardware from "./components/hardware/Hardware";
import Misc from "./components/misc/Misc";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/grocery" element={<Grocery />} />
        <Route path="/costco" element={<Costco />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/misc" element={<Misc />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
