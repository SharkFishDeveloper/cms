import CourseInterface from "@/util/interfaces/courseInterface";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io"; // Importing an arrow icon

export const CourseCardAdminPanel = ({ course }: { course: CourseInterface }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // State to toggle details

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible); // Toggle the details visibility
  };

  return (
    <div className="bg-black text-white p-4 rounded-lg shadow-lg w-[20rem] mx-auto space-y-3">
      {/* Thumbnail */}
      <Image
        src={course.thumbnailUrl}
        alt={course.courseName}
        height={350}  // Reduced height
        width={350}   // Reduced width
        className="object-cover rounded-lg"
      />

      {/* Course Info */}
      <div className="flex items-center justify-between">
        <h2 className="text-md font-bold ">{course.courseName[0].toUpperCase() + course.courseName.slice(1)}</h2>
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
            <strong>Instructor:</strong> {course.instructor.name[0].toUpperCase() + course.instructor.name.slice(1)}
          </p>
          <p>
            <strong>Price:</strong> ${course.price}
          </p>
          <p>
            <strong>Duration:</strong> {course.duration} hours
          </p>
          <p>
            <strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};
