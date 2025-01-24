import CourseInterface from "@/util/interfaces/courseInterface";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io"; // Importing an arrow icon

export const CourseCardAdminPanel = ({ course }: { course: CourseInterface }) => {
  const router =  useRouter();
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible); 
  };

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (confirmed) {
      alert("Course deleted successfully!"); // Replace with your delete logic
    }
  };

  const handleUpdate = () => {
    const confirmed = window.confirm("Are you sure you want to update this course?");
    if (confirmed) {
      
      router.push(`admin/update/course?id=${course.id}`);
    }
  };

  return (
    <div className="bg-black text-white p-4 rounded-lg shadow-lg w-[20rem] mx-auto space-y-3">
      {/* Thumbnail */}
      <div>{course.courseName}</div>

      {/* Course Info */}
      <div className="flex items-center justify-between">
        <h2 className="text-md font-bold">{course.courseName[0].toUpperCase() + course.courseName.slice(1)}</h2>
        {/* Toggle Button (Aligned to the right, same height as course name) */}
        <button
          onClick={toggleDetails}
          className="flex items-center text-blue-500 text-xs"
        >
          <IoMdArrowDropdown
            className={`mr-2 transition-transform ${isDetailsVisible ? "rotate-180" : ""}`} // Rotate the arrow on toggle
            size={20}
          />
          {isDetailsVisible ? "Hide Details" : "View Details"}
        </button>
      </div>

      <p className="text-gray-400 text-sm">{course.description[0].toUpperCase() + course.description.slice(1)}</p>

      {/* Course Details - Conditionally Rendered */}
      {isDetailsVisible && (
        <div className="space-y-1 mt-3 text-xs">
          <p>
            <strong>Instructor:</strong>{" "}
            {course.instructor.name[0].toUpperCase() + course.instructor.name.slice(1)}
          </p>
          <p>
            <strong>Price:</strong> ${course.price}
          </p>
          <p>
            <strong>Duration:</strong> {course.duration} weeks
          </p>
          <p>
            <strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 text-xs"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 text-xs"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
