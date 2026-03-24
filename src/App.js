import React, { useState } from "react";
import CourseList from "./components/CourseList";
import ProductList from "./components/ProductList";

function App() {
  const [view, setView] = useState("courses");

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">Smart Dashboard</span>

          <div>
            <button
              className="btn btn-outline-light me-2"
              onClick={() => setView("courses")}
            >
              Courses
            </button>

            <button
              className="btn btn-outline-light"
              onClick={() => setView("products")}
            >
              Inventory
            </button>
          </div>
        </div>
      </nav>

      {/* Conditional Rendering */}
      {view === "courses" ? <CourseList /> : <ProductList />}
    </div>
  );
}

export default App;