import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { mode, toggle } = useTheme();
  return (
    <button
      className={`btn ${mode === "dark" ? "btn-outline-light" : "btn-dark"}`}
      onClick={toggle}
      type="button"
    >
      {mode === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
