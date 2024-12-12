import React, { useState, useCallback } from "react";
import SearchField from "./components/SearchField";
import studentsData from "./data/StudentData";
import AddStudentModal from "./components/AddStudentModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudentButton from "./components/addStudentButton";
import StudentTable from "./components/studentTable";

const App = () => {
  const [students, setStudents] = useState(studentsData);
  const [filteredStudents, setFilteredStudents] = useState(studentsData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = useCallback(
    (query, searchOptions) => {
      const filtered = students.filter((student) => {
        if (searchOptions.byName) {
          return student.name.toLowerCase().includes(query.toLowerCase());
        }
        if (searchOptions.byClass) {
          return student.class.toLowerCase().includes(query.toLowerCase());
        }
        return true;
      });
      setFilteredStudents(filtered);
    },
    [students]
  );

  const handleAddStudent = useCallback(
    (newStudent) => {
      try {
        // Validate student data
        if (!newStudent.name || !newStudent.class || !newStudent.grade) {
          throw new Error("All fields are required");
        }

        // Check for duplicate ID
        const isDuplicateId = students.some(
          (student) => student.id === newStudent.id
        );
        if (isDuplicateId) {
          throw new Error("A student with this ID already exists");
        }

        const updatedStudents = [...students, newStudent];
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
        setIsModalOpen(false);
        toast.success("Student added successfully!");
      } catch (error) {
        toast.error(error.message);
      }
    },
    [students]
  );

  const handleDeleteStudent = useCallback(
    (id) => {
      try {
        // Validate ID
        if (!id) {
          throw new Error("Invalid student ID");
        }

        const studentToDelete = students.find((student) => student.id === id);
        if (!studentToDelete) {
          throw new Error("Student not found");
        }

        // Confirmation dialog
        const confirmDelete = window.confirm(
          `Are you sure you want to delete student ${studentToDelete.name}?`
        );

        if (confirmDelete) {
          const updatedStudents = students.filter(
            (student) => student.id !== id
          );
          setStudents(updatedStudents);
          setFilteredStudents(updatedStudents);
          toast.success("Student deleted successfully!");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [students]
  );

  const handleUpdateStudent = useCallback(
    (updatedStudent) => {
      try {
        // Validate student data
        if (
          !updatedStudent.name ||
          !updatedStudent.class ||
          !updatedStudent.grade
        ) {
          throw new Error("All fields are required");
        }

        const updatedStudents = students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        );

        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
        toast.success("Student updated successfully!");
      } catch (error) {
        toast.error(error.message);
      }
    },
    [students]
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Student Management System
      </h1>

      <div className="mb-4 flex justify-between items-center">
        <SearchField onSearch={handleSearch} />
        <AddStudentButton onClick={() => setIsModalOpen(true)} />
      </div>

      <StudentTable
        students={filteredStudents}
        onDeleteStudent={handleDeleteStudent}
        onUpdateStudent={handleUpdateStudent}
      />

      <div className="mt-4 text-sm text-gray-600 text-center">
        Total Students: {filteredStudents.length}
      </div>

      {isModalOpen && (
        <AddStudentModal
          onClose={() => setIsModalOpen(false)}
          onAddStudent={handleAddStudent}
        />
      )}
    </div>
  );
};

export default App;
