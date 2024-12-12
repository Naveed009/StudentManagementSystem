import React, { useState, useCallback } from "react";
import AddStudentModal from "./AddStudentModal";
// import { TrashIcon, SortIcon, EditIcon } from "@/assets/icons";
import { EditIcon, TrashIcon, SortIcon } from "../assets/icons";

const StudentTable = ({ students, onDeleteStudent, onUpdateStudent }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const getGradeColor = useCallback((grade) => {
    const gradeColors = {
      "A+": "bg-green-200 text-green-800",
      A: "bg-green-100 text-green-700",
      "B+": "bg-blue-200 text-blue-800",
      B: "bg-blue-100 text-blue-700",
      C: "bg-yellow-200 text-yellow-800",
      D: "bg-orange-200 text-orange-800",
      E: "bg-purple-200 text-purple-800",
      F: "bg-red-200 text-red-800",
    };
    return gradeColors[grade] || "bg-gray-200 text-gray-800";
  }, []);

  const handleEdit = useCallback((student) => {
    setCurrentStudent(student);
    setIsEditModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsEditModalOpen(false);
    setCurrentStudent(null);
  }, []);

  const handleUpdateStudent = useCallback(
    (updatedStudent) => {
      onUpdateStudent(updatedStudent);
      handleCloseModal();
    },
    [onUpdateStudent, handleCloseModal]
  );

  const sortedStudents = useCallback(() => {
    if (!sortConfig.key) return students;

    const sorted = [...students].sort((a, b) => {
      const aValue = a[sortConfig.key].toLowerCase();
      const bValue = b[sortConfig.key].toLowerCase();

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [students, sortConfig]);

  const handleSort = useCallback((key) => {
    setSortConfig((prevConfig) => {
      const direction =
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc";
      return { key, direction };
    });
  }, []);

  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden min-w-full sm:min-w-[600px]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-600 text-white uppercase h-12">
              <tr>
                {[
                  { label: "Name", key: "name", sortable: true },
                  { label: "Class", key: "class", sortable: true },
                  { label: "Grade", key: "grade", sortable: true },
                  { label: "Actions", key: null, sortable: false },
                ].map(({ label, key, sortable }) => (
                  <th key={label} className="px-16 py-2">
                    {sortable ? (
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSort(key)}
                      >
                        {label}
                        <SortIcon />
                      </div>
                    ) : (
                      label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedStudents().length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                sortedStudents().map((student) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-blue-50 transition-colors "
                  >
                    <td className="px-10 py-4">{student.name}</td>
                    <td className="px-16 py-4">{student.class}</td>
                    <td className="px-20 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getGradeColor(
                          student.grade
                        )}`}
                      >
                        {student.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex space-x-2 justify-center">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        aria-label="Edit student"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => onDeleteStudent(student.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Delete student"
                      >
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && currentStudent && (
        <AddStudentModal
          initialData={currentStudent}
          onClose={handleCloseModal}
          onAddStudent={handleUpdateStudent}
          isEditMode
        />
      )}
    </>
  );
};

export default React.memo(StudentTable);
