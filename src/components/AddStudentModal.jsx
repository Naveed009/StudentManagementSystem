import React, { useState, useEffect } from "react";

const AddStudentModal = ({
  initialData = null,
  onClose,
  onAddStudent,
  isEditMode = false,
}) => {
  // Predefined class options
  const classOptions = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
  ];

  const [formData, setFormData] = useState({
    id: initialData ? initialData.id : Date.now().toString(),
    name: initialData ? initialData.name : "",
    class: initialData ? initialData.class : "",
    grade: initialData ? initialData.grade : "",
  });

  // Generate unique ID if not in edit mode
  useEffect(() => {
    if (!isEditMode) {
      setFormData((prev) => ({
        ...prev,
        id: Date.now().toString(),
      }));
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.class || !formData.grade) {
      alert("Please fill in all fields");
      return;
    }

    // Add or update student
    onAddStudent(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Student" : "Add New Student"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Class</option>
              {classOptions.map((classOption) => (
                <option key={classOption} value={classOption}>
                  {classOption}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Grade</label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Grade</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isEditMode ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
