import React, { useState } from "react";

const CourseList = () => {
  const courses = [
    { id: 1, name: "Full Stack Development", seats: 10 },
    { id: 2, name: "Artificial Intelligence", seats: 0 },
    { id: 3, name: "Cyber Security", seats: 5 }
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  });

  const [registrations, setRegistrations] = useState([]);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
  const validateForm = () => {
    if (formData.name.length < 3) {
      alert("Name must be at least 3 characters");
      return false;
    }
    if (!formData.email.includes("@")) {
      alert("Invalid Email");
      return false;
    }
    if (formData.mobile.length !== 10) {
      alert("Mobile must be 10 digits");
      return false;
    }
    return true;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newEntry = {
      ...formData,
      course: selectedCourse.name
    };

    setRegistrations([...registrations, newEntry]);

    alert("Registered Successfully!");

    setShowModal(false);
    setFormData({ name: "", email: "", mobile: "" });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Courses</h2>

      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4" key={course.id}>
            <div className="card p-3 shadow mb-3">
              <h5>{course.name}</h5>
              <p>Seats: {course.seats}</p>

              <p className={course.seats > 0 ? "text-success" : "text-danger"}>
                {course.seats > 0 ? "Available" : "Full"}
              </p>

              <button
                className="btn btn-primary"
                disabled={course.seats === 0}
                onClick={() => {
                  setSelectedCourse(course);
                  setShowModal(true);
                }}
              >
                Register
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5>Register for {selectedCourse.name}</h5>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-control mb-2"
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control mb-2"
                  value={formData.email}
                  onChange={handleChange}
                />

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile"
                  className="form-control mb-2"
                  value={formData.mobile}
                  onChange={handleChange}
                />

                <button className="btn btn-success">Submit</button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MINI DATABASE VIEW */}
      <h4 className="mt-5">Registered Students</h4>
      <ul className="list-group">
        {registrations.map((reg, index) => (
          <li key={index} className="list-group-item">
            {reg.name} → {reg.course}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;