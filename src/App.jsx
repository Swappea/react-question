import React from "react";
import { Route, Routes } from "react-router-dom";
import { FlawedList } from "./components/FlawedList.jsx";

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 16 }}>
      <header style={{ marginBottom: 16 }}>
        <h2>List</h2>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<FlawedList />} />
        </Routes>
      </main>
    </div>
  );
}
